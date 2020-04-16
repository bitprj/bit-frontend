import { AUTHENTICATE, DEAUTHENTICATE, SET_USER_DATA } from '../actionTypes'

const storedMeta = localStorage.getItem('meta')

const initialState = {
	meta: JSON.parse(storedMeta),
	user: null
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTHENTICATE:
			return {
				...state,
				meta: action.meta
			}

		case DEAUTHENTICATE:
			return {}

		case SET_USER_DATA:
			return {
				...state,
				user: action.userData
			}

		default:
			return state
	}
}

export default reducer
