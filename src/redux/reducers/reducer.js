import * as actionTypes from '../actions/actionTypes'

const type = localStorage.getItem('userType')

const initialState = {
    userType: type ? type : 'Visitor'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STUDENT_LOGIN:
            return {
                ...state,
                userType: 'Student'
            }
        case actionTypes.USER_LOGOUT:
            return {
                ...state,
                userType: 'Visitor'
            }
        default:
            return state
    }
}

export default reducer;