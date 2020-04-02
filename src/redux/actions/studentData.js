import { fetchStudentData } from '../../services/StudentService'

import { SET_STUDENT_DATA, INCREMENT_GEMS_BY } from '../actionTypes'

import { setSelectedActivity } from './learnData'
import { saveToCache } from './cache'
import { CACHE_MODULE_PROGRESS } from '../../components/HOC/WithApiCache'

/* ===== INITIALIZATION */

export const init = () => async dispatch => {
	const studentData = await fetchStudentData()
	const [firstName] = studentData.name.split(' ')

	dispatch(setStudentData({ ...studentData, firstName }))

	// external
	dispatch(
		setSelectedActivity({
			id: 65,
			contentUrl:
				'https://d36nt3c422j20i.cloudfront.net/Topic1_Mongo/Module_DB/Lab3_Minesweeper/Minesweeper.json'
		})
	)
}

const setStudentData = studentData => {
	return {
		type: SET_STUDENT_DATA,
		studentData
	}
}

// ===== RUNTIME

export const chooseProject = (moduleId, project) => dispatch => {
	dispatch(
		saveToCache(
			CACHE_MODULE_PROGRESS,
			{ [moduleId]: { chosenProject: project } },
			{ merge: true }
		)
	)
}

export const incrementGemsBy = gemAmount => {
	return {
		type: INCREMENT_GEMS_BY,
		gemAmount
	}
}
