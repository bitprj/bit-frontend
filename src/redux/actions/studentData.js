import { SET_STUDENT_DATA, INCREMENT_GEMS_BY } from '../actionTypes'

import {
	fetchStudentData,
	updateModuleProgress
} from '../../services/StudentService'
import { setSelectedActivity } from './learnData'
import { saveToCache } from './cache'
import { CACHE_MODULE_PROGRESS } from '../../components/HOC/WithApiCache'

/* ===== INITIALIZATION */

export const init = () => async dispatch => {
	const studentData = await fetchStudentData()
	const [firstName] = studentData.name.split(' ')

	dispatch(setStudentData({ ...studentData, firstName }))

	// external
	dispatch(setSelectedActivity(studentData.suggestedActivity))
}

const setStudentData = studentData => ({
	type: SET_STUDENT_DATA,
	studentData
})

// ===== RUNTIME

export const chooseProject = (moduleId, project) => dispatch => {
	dispatch(
		saveToCache(
			CACHE_MODULE_PROGRESS,
			{ [moduleId]: { chosenProject: project } },
			{ merge: true }
		)
	)

	updateModuleProgress(moduleId, {
		chosen_project_id: project.id
	}).then(res => console.log(res.message))
}

export const incrementGemsBy = gemAmount => ({
	type: INCREMENT_GEMS_BY,
	gemAmount
})
