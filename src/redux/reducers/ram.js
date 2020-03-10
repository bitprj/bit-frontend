import {
	SET_SELECTED_ACTIVITY_ID,
	PUSH_TO_LOADED_ACTIVITIES,
	PUSH_TO_LOADED_MODULES
} from '../actionTypes'

const initialState = {
	selectedActivityId: undefined,
	loadedActivities: new Map(),
	loadedModules: new Map(),
	loadedTopics: new Map()
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ACTIVITY_ID: {
			return { ...state, selectedActivityId: action.activityId }
		}

		case PUSH_TO_LOADED_ACTIVITIES: {
			return {
				...state,
				loadedActivities: state.loadedActivities.concat(action.newLoads)
			}
		}

		case PUSH_TO_LOADED_MODULES: {
			return {
				...state,
				loadedModules: state.loadedModules.concat(action.newLoads)
			}
		}

		default:
			return state
	}
}

export default reducer
