import { get, merge as mergeDeep, cloneDeep } from 'lodash'
import { iterateNodes, objectArrayToObject } from '../../utils/objUtils'

import { genFetch } from '../../services/ContentfulService'
import {
	fetchCardStatus,
	fetchCheckpointProgress,
	unlockCard,
	unlockHint,
	submitCheckpointProgress
} from '../../services/LearnService'

import { autoFetch } from '../../services/ContentService'
import {
	fetchContentUrls,
	CACHE_CARD,
	CACHE_HINT_PROGRESS
} from '../../components/HOC/WithApiCache'

import { STATE_HINT } from '../../components/Learn/NextButton/NextButton'

import {
	SET_INDICATORS,
	SET_PROGRESS,
	//
	SET_ACTIVITY_SKELETON,
	SET_UNLOCKED_CARDS,
	SET_CARD_STATUSES,
	RESET_TO_INITIAL_STATE,
	SET_CARD,
	SET_HINT,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX,
	SET_SUBMITTED_CHECKPOINT_SUCCESSFUL,
	BROADCAST_BUTTON_STATE,
	SCHEDULE_BUTTON_STATE,
	RESET_BUTTON_STATE_SCHEDULE,
	PUSH_TO_LOADED_CHECKPOINTS_PROGRESS
} from '../actionTypes'

import { saveToCache } from './cache'
import { CACHE_ACTIVITY_PROGRESS } from '../../components/HOC/WithApiCache'

/* ===== INITIALIZATION */

export const init = (activity, activityProgress) => dispatch => {
	dispatch(initActivityProgress(activity, activityProgress))
	dispatch(preloadActivityCards(activity))
}

const initActivityProgress = (activity, activityProgress) => async dispatch => {
	const foundIndex = activity.cards.findIndex(
		card => card.id === activityProgress.lastCardUnlockedId
	)
	const index = Math.max(0, foundIndex) // TODO this is also an error here

	dispatch({
		type: SET_INDICATORS,
		indicators: {
			currentCardIndex: index,
			lastCardUnlockedIndex: index
		}
	})
}

const preloadActivityCards = activity => async dispatch => {
	const cards = await Promise.all(
		activity.cards.map(async card => {
			const cardData = await autoFetch(card.id, CACHE_CARD)
			const cardDataWithContent = await fetchContentUrls(cardData)
			return { [card.id]: cardDataWithContent }
		})
	)
	dispatch(saveToCache(CACHE_CARD, objectArrayToObject(cards)))
}

/**
 * Setup the Learning View with appropriate activity
 * and user progress
 * @param {*} activityId
 */
// export const init = activityId => async dispatch => {
/**
 * FETCH_ACTIVITY_PROGRESS
 *  - get the card the user is currently on
 */
// Process activityProgress
// const cardsProgressed = activitySkeleton.cards.slice(0, index + 1)
// // Fetch Unlocked Card data
// const unlockedCards = await fetchUnlockedCards(cardsProgressed)
// // console.log(unlockedCards)
// dispatch(setUnlockedCards(unlockedCards))
// // Fetch Cards and their Statuses
// // (from fetchActivityProgress, multiple fetchCardStatus)
// const cardStatuses = await initCardStatuses(activityId, unlockedCards)
// dispatch(setCardStatuses(cardStatuses))
// const checkpointProgresses = await initCheckpointProgress(unlockedCards)
// dispatch(
// 	pushToLoadedCheckpointsProgress(objectArrayToObject(checkpointProgresses))
// )
// }

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

			console.log(unprocessedCardData)

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

const initCheckpointProgress = unlockedCards =>
	Promise.all(
		unlockedCards
			.filter(card => card.checkpoint)
			.map(async card => {
				try {
					const progress = await fetchCheckpointProgress(card.checkpoint.id)
					return { [card.checkpoint.id]: progress }
				} catch (e) {
					return { [card.checkpoint.id]: [] }
				}
			})
	)

const setActivitySkeleton = activity => ({
	type: SET_ACTIVITY_SKELETON,
	activity
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

export const resetToInitialState = () => ({
	type: RESET_TO_INITIAL_STATE
})

export const initUnlockCard = (activityId, id) => async dispatch => {
	dispatch(
		saveToCache(
			CACHE_ACTIVITY_PROGRESS,
			{ [activityId]: { lastCardUnlockedId: id } },
			{ merge: true }
		)
	)
	unlockCard(activityId, id).then(res => console.log(res.message))
}

export const initUnlockHint = (activityId, id) => async dispatch => {
	dispatch(
		saveToCache(
			CACHE_HINT_PROGRESS,
			{ [id]: { isUnlocked: true } },
			{ merge: true }
		)
	)
	dispatch({
		type: SET_INDICATORS,
		indicators: {
			lastHintUnlockedId: id
		}
	})
	dispatch(scheduleButtonState(STATE_HINT))

	unlockHint(activityId, id).then(res => console.log(res.message))
}

export const initSubmitCheckpointProgress = (
	activityId,
	checkpointId,
	type,
	content
) => async dispatch => {
	try {
		const response = await submitCheckpointProgress(
			activityId,
			checkpointId,
			type,
			content
		)
		dispatch(setSubmittedCheckpointSuccessful(true))
		dispatch(
			pushToLoadedCheckpointsProgress(
				{
					[checkpointId]: response
				},
				type === 'Autograder'
			)
		)
	} catch (e) {
		console.log(e)
		dispatch(setSubmittedCheckpointSuccessful(false))
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

const setSubmittedCheckpointSuccessful = success => ({
	type: SET_SUBMITTED_CHECKPOINT_SUCCESSFUL,
	success
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

export const pushToLoadedCheckpointsProgress = (newLoads, autograder) => ({
	type: PUSH_TO_LOADED_CHECKPOINTS_PROGRESS,
	newLoads,
	autograder
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
