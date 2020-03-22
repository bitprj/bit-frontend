import {
	SET_SUBMISSIONS,
	SET_CURRENT_CLASSROOM_BY_INDEX,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

const initialState = {
	indicators: {
		currentClassroomIndex: 0,
		currentSubmissionIndex: 0
	},
	submissions: []
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SUBMISSIONS: {
			return {
				...state,
				submissions: action.submissions
			}
		}

		case SET_CURRENT_CLASSROOM_BY_INDEX: {
			return {
				...state,
				indicators: {
					...state.indiciators,
					currentClassroomIndex: action.classroomIndex
				}
			}
		}

		case SET_CURRENT_SUBMISSION_BY_INDEX: {
			return {
				...state,
				indicators: {
					...state.indicators,
					currentSubmissionIndex: action.submissionIndex
				}
			}
		}

		default:
			return state
	}
}

export default reducer
