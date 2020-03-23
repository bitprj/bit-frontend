import { combineReducers } from 'redux'
import account from './reducers/account'
import learnData from './reducers/learnData'
import ram from './reducers/ram'
import studentData from './reducers/studentData'
import teacherData from './reducers/teacherData'
import theme from './reducers/theme'

export default combineReducers({
	account,
	learnData,
	ram,
	studentData,
	teacherData,
	theme
})
