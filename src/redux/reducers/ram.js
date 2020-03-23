import {
	SET_SELECTED_ACTIVITY_ID,
	PUSH_TO_LOADED_ACTIVITIES,
	PUSH_TO_LOADED_MODULES,
	PUSH_TO_LOADED_CHECKPOINTS,
	PUSH_TO_LOADED_CONCEPTS,
	PUSH_TO_LOADED_HINTS
} from '../actionTypes'

const initialState = {
	selectedActivityId: undefined,
	loadedModules: {},
	loadedActivities: {},
	loadedCheckpoints: {},
	loadedConcepts: {},
	loadedHints: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ACTIVITY_ID: {
			return { ...state, selectedActivityId: action.activityId }
		}

		case PUSH_TO_LOADED_MODULES: {
			return {
				...state,
				loadedModules: { ...state.loadedModules, ...action.newLoads }
			}
		}

		case PUSH_TO_LOADED_ACTIVITIES: {
			return {
				...state,
				loadedActivities: { ...state.loadedActivities, ...action.newLoads }
			}
		}

		// case PUSH_TO_LOADED_CARDS: {
		// 	return {
		// 		...state,
				// loadedModules: state.loadedModules.concat(action.newLoads)
		// 	}
		// }

		case PUSH_TO_LOADED_CHECKPOINTS: {
			return {
				...state,
				loadedCheckpoints: { ...state.loadedCheckpoints, ...action.newLoads }
			}
		}

		case PUSH_TO_LOADED_CONCEPTS: {
			return {
				...state,
				loadedConcepts: { ...state.loadedConcepts, ...action.newLoads }
			}
		}

		case PUSH_TO_LOADED_HINTS: {
			return {
				...state,
				loadedHints: { ...state.loadedHints, ...action.newLoads }
			}
		}

		default:
			return state
	}
}

export default reducer
