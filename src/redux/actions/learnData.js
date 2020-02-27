import { get } from 'lodash'
import { iterateNodes } from '../../utils/deepObjUtils'
import { genFetch } from '../../services/ContentfulService'
import {
	fetchActivity,
	fetchActivityProgress,
	fetchCardStatus,
	unlockCard,
	unlockHint
} from '../../services/LearnService'

import { STATE_HINT } from '../../components/Learn/NextButton/NextButton'

import {
	SET_ACTIVITY,
	SET_ACTIVITY_PROGRESS,
	SET_UNLOCKED_CARDS,
	SET_CARD_STATUSES,
	SET_CARD,
	SET_HINT,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX,
	BROADCAST_BUTTON_STATE,
	SCHEDULE_BUTTON_STATE,
	RESET_BUTTON_STATE_SCHEDULE
} from '../utils/actionTypes'

/* ===== INITIALIZATION */

/**
 * Setup the Learning View with appropriate activity
 * and user progress
 * @param {*} activityId
 */
export const init = activityId => async dispatch => {
	try {
		// Concurrently FetchActivity and FetchActivityProgress
		let [activityBase, activityProgress] = await Promise.all([
			fetchActivity(activityId),
			fetchActivityProgress(activityId)
		])

		activityBase.cards.sort((a, b) => a.order - b.order)
		dispatch(setActivity(activityBase))

		// Process activityProgress
		let index = activityBase.cards.findIndex(
			// card => card.contentfulId === activityProgress.cardContentfulId
			card => card.contentfulId === '4HgUxdMhu3ROtsRJeZzSLH'
		)
		index = index >= 0 ? index : 0
		activityProgress = {
			currentCardIndex: index,
			lastCardUnlockedIndex: index
		}
		dispatch(setActivityProgress(activityProgress))

		const cardsProgressed = activityBase.cards.slice(0, index + 1)

		// Fetch Cards and their Statuses
		// (from fetchActivityProgress, multiple fetchCardStatus)
		const pendingCardStatuses = initCardStatuses(activityId, cardsProgressed)

		// done this way because CDN will be guaranteed to be faster
		// only issue is if contentful's CDN stalls which is rarely
		const [conceptsUnlockedCards, unlockedCards] = await Promise.all([
			fetchConceptsUnlockedCards(cardsProgressed),
			fetchUnlockedCards(cardsProgressed)
		])
		dispatch(setUnlockedCards(unlockedCards))
		console.log(unlockedCards)
		console.log(conceptsUnlockedCards)

		const cardStatuses = await pendingCardStatuses
		dispatch(setCardStatuses(cardStatuses))
	} catch (e) {
		alert('[try logging in] ' + e)
	}
}

const fetchUnlockedCards = cardsProgressed => {
	return Promise.all(
		cardsProgressed.map(card => {
			return genFetch(card.contentfulId)
		})
	)
}

const fetchConceptsUnlockedCards = cardsProgressed => {
	return Promise.all(
		cardsProgressed.map(card => {
			return card.concepts.map(concept => {
				return genFetch(concept.contentfulId)
			})
		})
	)
}

const initCardStatuses = (activityId, cardsProgressed) =>
	Promise.all(
		cardsProgressed.map(card => {
			if (get(card, 'hints.length') === 0) return []
			return fetchAndProcessCardStatus(activityId, card.id)
		})
	)

const fetchAndProcessCardStatus = async (activityId, id) => {
	const cardStatus = await fetchCardStatus(activityId, id)
	return iterateNodes(cardStatus, node => {
		// processing
		if (node.hint) {
			Object.assign(node, { ...node.hint })
			delete node.hint
		}
		// TEMP - RENAMING
		if (node.hintChildren) {
			node.hints = node.hintChildren
			delete node.hintChildren
		}
		// END TEMP
	})
}

const setActivity = activity => ({
	type: SET_ACTIVITY,
	activity
})

const setActivityProgress = activityProgress => ({
	type: SET_ACTIVITY_PROGRESS,
	activityProgress
})

const setUnlockedCards = unlockedCards => ({
	type: SET_UNLOCKED_CARDS,
	unlockedCards
})

const setCardStatuses = cardStatuses => ({
	type: SET_CARD_STATUSES,
	cardStatuses
})

// ===== RUNTIME

export const initUnlockCard = (activityId, id, contentId) => async dispatch => {
	const card = await genFetch(contentId)
	dispatch(setCard(card))

	try {
		// await unlockCard(activityId, id)
	} catch (e) {
		// alert('[ERROR]: ' + e)
	}
}

export const initUnlockHint = (activityId, id, contentId) => async dispatch => {
	const hint = await genFetch(contentId)
	dispatch(setHint(id, contentId, hint))
	dispatch(scheduleButtonState(STATE_HINT))

	try {
		// await unlockHint(activityId, id)
	} catch (e) {
		// alert('[ERROR]: ' + e)
	}
}

export const setCurrentCardByIndex = cardIndex => ({
	type: SET_CURRENT_CARD_BY_INDEX,
	cardIndex
})
export const incrementCurrentCardIndex = () => ({
	type: INCREMENT_CURRENT_CARD_INDEX
})

export const setLastCardUnlockedIndexById = cardId => ({
	type: SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	cardId
})
export const incrementLastCardUnlockedIndex = () => ({
	type: INCREMENT_LAST_CARD_UNLOCKED_INDEX
})

export const broadcastButtonState = buttonState => ({
	type: BROADCAST_BUTTON_STATE,
	buttonState
})
export const scheduleButtonState = buttonState => ({
	type: SCHEDULE_BUTTON_STATE,
	buttonState
})
export const resetButtonStateSchedule = buttonState => ({
	type: RESET_BUTTON_STATE_SCHEDULE,
	buttonState
})

const setCard = card => ({
	type: SET_CARD,
	card
})

const setHint = (id, contentId, hint) => ({
	type: SET_HINT,
	id,
	contentId,
	hint
})
