import { cloneDeep } from 'lodash'

import { getHint, genFetch } from '../../services/ContentfulService'
import {
	SET_ACTIVITY,
	SET_CURRENT_CARD_BY_INDEX,
	INCREMENT_CURRENT_CARD_INDEX,
	SET_LAST_CARD_COMPLETED_INDEX_BY_ID,
	INCREMENT_LAST_CARD_COMPLETED_INDEX
} from '../utils/actionTypes'

/* ===== GENERAL */

export const init = () => {
	return async dispatch => {
		let activity = await initActivity('18mFbdi3UGiMZJSUXU7dxI')
		dispatch(setActivity(activity))
		// activity = await initAllHints(activity);
		// dispatch(setActivity(activity))
	}
}

export const initSteps = hintID => {
	genFetch(hintID).then(response => console.log(response))
	return genFetch(hintID)
}

export const setCurrentCardByIndex = cardIndex => {
	return {
		type: SET_CURRENT_CARD_BY_INDEX,
		cardIndex
	}
}
export const incrementCurrentCardIndex = () => {
	return {
		type: INCREMENT_CURRENT_CARD_INDEX
	}
}

export const setLastCardCompletedIndexByID = cardID => {
	return {
		type: SET_LAST_CARD_COMPLETED_INDEX_BY_ID,
		cardID
	}
}
export const incrementLastCardCompletedIndex = () => {
	return {
		type: INCREMENT_LAST_CARD_COMPLETED_INDEX
	}
}

/* ===== HELPERS */

const setActivity = activity => {
	return {
		type: SET_ACTIVITY,
		activity
	}
}

/* ASYNC REQUESTS */
const initActivity = activityID => {
	return genFetch(activityID, 2)
}

/**
 * LEGACY CODE THAT I DON'T WANT TO DELETE
 *
 * @param {*} activity
 */
const initAllHints = activity => {
	const newActivity = cloneDeep(activity)
	newActivity.cards.map(card => {
		let { hints } = card.fields
		hints && initEachHint(hints)
		return card
	})
	return newActivity
}
const initEachHint = hints => {
	// return Promise.all(
	hints.map(hintObj => {
		const { id: hintID } = hintObj.sys
		hintObj.content = getHint(hintID)
		return hintObj
	})
	// )
}
