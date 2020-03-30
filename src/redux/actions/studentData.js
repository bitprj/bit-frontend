import { fetchStudentData } from '../../services/StudentService'

import {
	SET_STUDENT_DATA,
	SET_CURRENT_TRACK,
	SET_CURRENT_TOPIC,
	SET_SUGGESTED_ACTIVITY,
	INCREMENT_GEMS_BY
} from '../actionTypes'

import { setSelectedActivity } from './learnData'

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

export const incrementGemsBy = gemAmount => {
	return {
		type: INCREMENT_GEMS_BY,
		gemAmount
	}
}
