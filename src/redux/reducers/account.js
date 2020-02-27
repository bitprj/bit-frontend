import { AUTHENTICATE, DEAUTHENTICATE } from '../utils/actionTypes'

const type = localStorage.getItem('userType')

const initialState = {
	userType: type || 'VISITOR'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				userType: action.userType
			}
		case DEAUTHENTICATE:
			return {
				...state,
				userType: 'VISITOR'
			}
		default:
			return state
	}
}

export default reducer
