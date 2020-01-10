import { combineReducers } from 'redux';
import reducer from './reducer';
import studentData from './studentData'
import viewManager from './viewManager'

export default combineReducers({
    reducer,
    studentData,
    viewManager
});
