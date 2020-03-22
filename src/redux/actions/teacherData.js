import {
  SET_SUBMISSIONS,
  SET_CURRENT_CLASSROOM_BY_INDEX,
	SET_CURRENT_SUBMISSION_BY_INDEX
} from '../actionTypes'

import {
	fetchTeacherData,
	fetchClassroom,
	fetchSubmissionsAll
} from '../../services/TeacherService'

/* ===== INITIALIZATION */
export const init = () => async dispatch => {
	const teacherData = await fetchTeacherData()
	const classroomId = teacherData.classrooms[0].id

	const [classroom, submissions] = await Promise.all([
		fetchClassroom(classroomId),
		fetchSubmissionsAll(classroomId)
	])

	console.log(classroom, submissions)
	dispatch(setSubmissions(submissions))
}

const setSubmissions = submissions => ({
	type: SET_SUBMISSIONS,
	submissions
})

/* ===== RUNTIME */
export const setCurrentClassroomByIndex = classroomIndex => ({
	type: SET_CURRENT_CLASSROOM_BY_INDEX,
	classroomIndex
})

export const setCurrentSubmissionByIndex = submissionIndex => ({
	type: SET_CURRENT_SUBMISSION_BY_INDEX,
	submissionIndex
})
