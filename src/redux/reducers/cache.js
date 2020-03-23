import { SET_SELECTED_ACTIVITY_ID, SAVE_TO_CACHE } from '../actionTypes'

const initialState = {
	selectedActivityId: undefined,
	cachedTopics: {},
	cachedModules: {},
	cachedActivities: {},
	cachedCards: {},
	cachedCheckpoints: {},
	cachedConcepts: {},
	cachedHints: {},

	cachedActivitiesProgress: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_ACTIVITY_ID: {
			return { ...state, selectedActivityId: action.activityId }
		}

		case SAVE_TO_CACHE: {
			return {
				...state,
				[action.cacheType]: {
					...state[action.cacheType],
					...action.newLoads
				}
			}
		}

		default:
			return state
	}
}

export default reducer
