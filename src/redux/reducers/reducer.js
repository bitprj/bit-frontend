const type = localStorage.getItem('userType')

const initialState = {
    userType: type ? type : 'Visitor'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STUDENT_LOGIN':
            return {
                ...state,
                userType: 'Student'
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                userType: 'Visitor'
            }
        default:
            return state
    }
}

export default reducer;