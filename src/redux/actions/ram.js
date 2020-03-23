import {
	SET_SELECTED_ACTIVITY_ID,
	PUSH_TO_LOADED_MODULES,
	PUSH_TO_LOADED_ACTIVITIES,
	PUSH_TO_LOADED_CHECKPOINTS,
	PUSH_TO_LOADED_CONCEPTS,
	PUSH_TO_LOADED_HINTS
} from '../actionTypes'

/* ====== RUNTIME */
export const setSelectedActivityId = activityId => ({
	type: SET_SELECTED_ACTIVITY_ID,
	activityId
})

export const pushToLoadedActivities = newLoads => ({
	type: PUSH_TO_LOADED_ACTIVITIES,
	newLoads
})

export const pushToLoadedModules = newLoads => ({
	type: PUSH_TO_LOADED_MODULES,
	newLoads
})
