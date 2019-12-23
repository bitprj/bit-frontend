const type = localStorage.getItem('userType')

const initialState = {
    userType: type ? type : 'visitor'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'STUDENT_LOGIN':
            return {
                ...state,
                userType: 'student'
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                userType: 'visitor'
            }
        default:
            return state
    }
}

export default reducer;