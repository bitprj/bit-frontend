import { combineReducers } from 'redux'
import account from './reducers/account'
import learnData from './reducers/learnData'
import cache from './reducers/cache'
import studentData from './reducers/studentData'
import teacherData from './reducers/teacherData'
import theme from './reducers/theme'

export default combineReducers({
	account,
	learnData,
	cache,
	studentData,
	teacherData,
	theme
})
