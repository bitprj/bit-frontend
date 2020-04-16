import {
	RESET_STUDENT_DATA,
	SAVE_TO_PROGRESS,
	SET_STUDENT_DATA,
	SET_CURRENT_TRACK,
	SET_CURRENT_TOPIC,
	SET_SUGGESTED_ACTIVITY,
	INCREMENT_GEMS_BY
} from '../actionTypes'
import * as cacheTypes from '../../components/HOC/WithApiCache'

const initialState = {
	suggestedActivity: null,
	inprogressModules: [],
	inprogressTopics: [],
	gems: 860,

	[cacheTypes.CACHE_MODULE_PROGRESS]: {},
	[cacheTypes.CACHE_ACTIVITY_PROGRESS]: {},
	[cacheTypes.CACHE_HINT_PROGRESS]: {},
	[cacheTypes.CACHE_CHECKPOINTS_PROGRESS]: {}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case RESET_STUDENT_DATA: {
			return initialState
		}

		case SAVE_TO_PROGRESS: {
			return state
		}

		case SET_STUDENT_DATA: {
			return {
				...initialState,
				...action.studentData
			}
		}

		case SET_CURRENT_TRACK: {
			return {
				...state,
				current_track: { ...action.currentTrack }
			}
		}

		case SET_CURRENT_TOPIC: {
			return {
				...state,
				current_topic: { ...action.currentTopic }
			}
		}

		case SET_SUGGESTED_ACTIVITY: {
			return {
				...state,
				suggested_activity: { ...action.suggestedActivity }
			}
		}

		case INCREMENT_GEMS_BY: {
			return {
				...state,
				gems: state.gems + action.gemAmount
			}
		}

		default:
			return state
	}
}

export default reducer
