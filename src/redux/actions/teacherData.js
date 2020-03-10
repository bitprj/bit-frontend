import {
	SET_SUBMISSIONS,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

import { fetchSubmissions } from '../../services/TeacherService'

/* ===== INITIALIZATION */
export const init = classroomID => async dispatch => {
	const submissions = await fetchSubmissions(classroomID)
	console.log(submissions)
	dispatch(setSubmissions(submissions))
}

const setSubmissions = submissions => ({
	type: SET_SUBMISSIONS,
	submissions
})

/* ===== RUNTIME */
export const setCurrentSubmissionByIndex = submissionIndex => ({
	type: SET_CURRENT_SUBMISSION_BY_INDEX,
	submissionIndex
})
