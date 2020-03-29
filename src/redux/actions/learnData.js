import { objectArrayToObject } from '../../utils/objUtils'

import {
	unlockCard,
	unlockHint,
	submitCheckpointProgress
} from '../../services/LearnService'
import { autoFetch } from '../../services/ContentService'
import {
	fetchContentUrl,
	CACHE_CARD,
	CACHE_HINT_PROGRESS,
	CACHE_CHECKPOINTS_PROGRESS
} from '../../components/HOC/WithApiCache'
import { saveToCache } from './cache'
import { CACHE_ACTIVITY_PROGRESS } from '../../components/HOC/WithApiCache'

import {
	SET_SELECTED_ACTIVITY,
	SET_INDICATORS,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_UNLOCKED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_UNLOCKED_INDEX,
	BROADCAST_BUTTON_STATE,
	SCHEDULE_BUTTON_STATE,
	RESET_BUTTON_STATE_SCHEDULE
} from '../actionTypes'

import { STATE_HINT } from '../../components/Learn/NextButton/NextButton'

/* ===== INITIALIZATION */

export const init = (activity, activityProgress) => dispatch => {
	dispatch(initActivityProgress(activity, activityProgress))
	dispatch(preloadActivityCards(activity))
	// dispatch(preloadHintsProgress(activity))
	// dispatch(preloadCheckpointsProgress(activity))
}

const initActivityProgress = (activity, activityProgress) => async dispatch => {
	if (!activityProgress) return

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
			const cardDataWithContent = cardData
			// const cardDataWithContent = await fetchContentUrl(cardData)
			return { [card.id]: cardDataWithContent }
		})
	)
	dispatch(saveToCache(CACHE_CARD, objectArrayToObject(cards)))
}

// const preloadHintsProgress = activity

// const preloadCheckpointsProgress = activity.cards =>
// 	Promise.all(
// 		cards
// 			.filter(card => card.checkpoint)
// 			.map(async card => {
// 				try {
// 					const progress = await fetchCheckpointProgress(card.checkpoint.id)
// 					return { [card.checkpoint.id]: progress }
// 				} catch (e) {
// 					return { [card.checkpoint.id]: [] }
// 				}
// 			})
// 	)

/**
 * Setup the Learning View with appropriate activity
 * and user progress
 * @param {*} activityId
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

// ===== RUNTIME

export const setSelectedActivity = ({ id, contentUrl }) => dispatch => {
	dispatch({
		type: SET_SELECTED_ACTIVITY,
		selectedActivity: { id, contentUrl }
	})
}

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
	id,
	type,
	content,
	progress
) => async dispatch => {
	try {
		const response = await submitCheckpointProgress(
			activityId,
			id,
			type,
			content
		)
		dispatch({
			type: SET_INDICATORS,
			indicators: {
				submittedCheckpointSuccessful: true
			}
		})

		let final = response

		if (type === 'Autograder') {
			const newProgress = {
				...progress,
				submissions: [...progress.submissions]
			}
			newProgress.submissions.unshift(response)
			final = newProgress
		}

		dispatch(
			saveToCache(CACHE_CHECKPOINTS_PROGRESS, { [id]: final }, { merge: true })
		)
	} catch (e) {
		dispatch({
			type: SET_INDICATORS,
			indicators: {
				submittedCheckpointSuccessful: false
			}
		})
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

export const resetSubmittedCheckpointSuccessful = () => ({
	type: SET_INDICATORS,
	indicators: {
		submittedCheckpointSuccessful: undefined
	}
})
