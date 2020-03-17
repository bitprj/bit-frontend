import {
	SET_SUBMISSIONS,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

import { fetchClassroom, fetchSubmissions } from '../../services/TeacherService'

/* ===== INITIALIZATION */
export const init = classroomId => async dispatch => {
	const [classroom, submissions] = await Promise.all([
		fetchClassroom(classroomId),
		fetchSubmissions(classroomId)
	])

	console.log(classroom, submissions)
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
