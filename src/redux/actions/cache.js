import { SET_SELECTED_ACTIVITY_ID, SAVE_TO_CACHE } from '../actionTypes'

/* ====== RUNTIME */
export const setSelectedActivityId = activityId => ({
	type: SET_SELECTED_ACTIVITY_ID,
	activityId
})

export const saveToCache = (cacheType, newLoads) => ({
	type: SAVE_TO_CACHE,
	cacheType,
	newLoads
})
