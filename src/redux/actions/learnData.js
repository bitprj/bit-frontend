import { cloneDeep } from 'lodash'

import { getHint, genFetch } from '../../services/ContentfulService'
import { SET_ACTIVITY } from '../utils/actionTypes'

const setActivity = activity => {
	return {
		type: SET_ACTIVITY,
		activity
	}
}

export const initLearnData = activityID => {
	return async dispatch => {
		const activity = await initActivity(activityID)
		dispatch(setActivity(activity))
    const activityWithHints = await initAllHints(activity)
    dispatch(setActivity(activityWithHints))
    // console.log(activityWithHints)
	}
}

/* HELPER FUNCTIONS */

const initActivity = activityID => {
	return genFetch(activityID)
}

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
