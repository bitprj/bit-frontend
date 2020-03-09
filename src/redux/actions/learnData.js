import { get, merge as mergeDeep, cloneDeep } from 'lodash'
import { iterateNodes } from '../../utils/deepObjUtils'
import { genFetch } from '../../services/ContentfulService'
import {
	fetchActivity,
	fetchActivityProgress,
	fetchCardStatus,
	unlockCard,
	unlockHint,
	submitCheckpointProgress
} from '../../services/LearnService'

import { STATE_HINT } from '../../components/Learn/NextButton/NextButton'

import {
	INDICATE_INITIAL_LOAD_LEARN,
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
export const init = (activityId, currentCardIndex) => async dispatch => {
	// Concurrently FetchActivity and FetchActivityProgress
	let [activityBase, activityProgress] = await Promise.all([
		fetchActivity(activityId),
		fetchActivityProgress(activityId)
	])

	activityBase.cards.sort((a, b) => a.order - b.order)
	dispatch(setActivity(activityBase))

	// Process activityProgress
	let index = activityBase.cards.findIndex(
		card => card.contentfulId === activityProgress.cardContentfulId
	)
	if (index === -1) index = 0 // TODO also an error here
	activityProgress = {
		currentCardIndex: index,
		lastCardUnlockedIndex: index
	}

	if (currentCardIndex) {
		activityProgress.currentCardIndex = currentCardIndex
	}
	dispatch(setActivityProgress(activityProgress))

	const cardsProgressed = activityBase.cards.slice(0, index + 1)

	// Fetch Unlocked Card data
	let unlockedCards = await fetchUnlockedCards(cardsProgressed)
	dispatch(setUnlockedCards(unlockedCards))

	// Fetch Cards and their Statuses
	// (from fetchActivityProgress, multiple fetchCardStatus)
	const cardStatuses = await initCardStatuses(activityId, unlockedCards)
	dispatch(setCardStatuses(cardStatuses))
}

const fetchUnlockedCards = cardsProgressed => {
	return Promise.all(
		cardsProgressed.map(async card => {
			const [unprocessedCardData, concepts] = await Promise.all([
				genFetch(card.contentfulId),
				Promise.all(
					card.concepts.map(concept => {
						return genFetch(concept.contentfulId) // fetch concept steps
					})
				)
			])

			/**
			 * This destructure allows you to exclude variables from cardData
			 * Excluded variables are the variables listed before
			 *  - destructure renames added for additional info
			 */
			const {
				hints,
				checkpoint,
				concepts: useless,
				...cardData // just in case more data is added later
			} = unprocessedCardData

			const newCard = {
				...card,
				...cardData,
				hints: card.hints.map((hint, i) => ({ ...hints[i], ...hint })),
				checkpoint: card.checkpoint
					? { ...card.checkpoint, ...checkpoint }
					: null,
				concepts
			}

			return cloneDeep(newCard)
		})
	)
}

const initCardStatuses = (activityId, unlockedCards) =>
	Promise.all(
		unlockedCards.map(async card => {
			if (get(card, 'hints.length') === 0) return []
			const [cardStatus, cardData] = await Promise.all([
				fetchCardStatus(activityId, card.id),
				genFetch(card.contentfulId, 5)
			])
			const allHintsData = cardData.hints
			mergeDeep(cardStatus, allHintsData)

			iterateNodes(cardStatus, node => {
				// processing (kinda useless but for now, easier readability)
				// this is done bc the hint object doesn't provide anything useful
				// ^ (id, contentfulId)
				if (node.hint) {
					Object.assign(node, { ...node.hint })
					delete node.hint
				}

				if (node.isUnlocked === false) {
					// need false check
					node.steps = []
				}
			})
			return cardStatus
		})
	)

export const indicateInitialLoadLearn = () => ({
	type: INDICATE_INITIAL_LOAD_LEARN
})

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

	if (card.concepts && card.concepts.length) {
		card.concepts = await Promise.all(
			card.concepts.map(concept => {
				return genFetch(concept.contentfulId)
			})
		)
	}

	dispatch(setCard(card))

	console.log(await unlockCard(activityId, id))
}

export const initUnlockHint = (activityId, id, contentId) => async dispatch => {
	const hint = await genFetch(contentId)
	dispatch(setHint(id, contentId, hint))
	dispatch(scheduleButtonState(STATE_HINT))

	console.log(await unlockHint(activityId, id))
}

export const initSubmitCheckpointProgress = (
	checkpointId,
	type,
	content
) => async dispatch => {
	const response = await submitCheckpointProgress(checkpointId, type, content)
	console.log(response)
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
