import { combineReducers } from 'redux';
import reducer from './reducers/reducer';
import studentData from './reducers/studentData'
import viewManager from './reducers/viewManager'
import theme from './theme/themeReducer'

export default combineReducers({
    reducer,
    studentData,
    viewManager,
    theme
});
