import {
	SET_SUBMISSIONS,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../utils/actionTypes'

const initialState = {
	indicators: {
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
