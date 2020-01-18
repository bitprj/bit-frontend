import { combineReducers } from 'redux';
import reducer from './account/reducer';
import studentData from './studentData/reducer'
import viewManager from './viewManager/reducer'
import theme from './theme/reducer'

export default combineReducers({
    reducer,
    studentData,
    viewManager,
    theme
});
