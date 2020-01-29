import { combineReducers } from 'redux';
import account from './reducers/account';
import studentData from './reducers/studentData'
import learnData from './reducers/learnData'
import viewManager from './reducers/viewManager'
import theme from './reducers/theme'

export default combineReducers({
    account,
    studentData,
    learnData,
    viewManager,
    theme
});
