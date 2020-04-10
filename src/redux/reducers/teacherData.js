import {
	SET_SUBMISSIONS,
	UPDATE_FEEDBACKS,
	SET_CURRENT_CLASSROOM_BY_INDEX,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

const initialState = {
	indicators: {
		currentClassroomIndex: 0,
		currentSubmissionIndex: 1
	},
	submissions: [],

	ram: {
		feedbacks: {
			// student1_checkpoint23: {
			// 	checkpoint_id: '69',
			// 	is_passed: 'true',
			// 	comment: 'I am a comment'
			// }
		}
	}
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SUBMISSIONS: {
			return {
				...state,
				submissions: action.submissions
			}
		}

		case UPDATE_FEEDBACKS: {
			const { studentId, checkpointId, feedbackChanges } = action
			const feedbackKey = `student${studentId}_checkpoint${checkpointId}`

			return {
				...state,
				ram: {
					...state.ram,
					feedbacks: {
						...state.ram.feedbacks,
						[feedbackKey]: {
							...state.ram.feedbacks?.[feedbackKey],
							...feedbackChanges
						}
					}
				}
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
