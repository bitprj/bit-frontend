import { AUTHENTICATE, DEAUTHENTICATE, SET_USER_DATA } from '../actionTypes'
import { fetchUserData, logout } from '../../services/AccountService'

export const initUserData = userId => async dispatch => {
	const userData = await fetchUserData(userId)
	dispatch({
		type: SET_USER_DATA,
		userData
	})
}

export const authenticate = meta => {
	localStorage.setItem('meta', JSON.stringify(meta))
	return {
		type: AUTHENTICATE,
		meta
	}
}

export const deauthenticate = () => {
	logout().then(_ => console.log(_))

	localStorage.removeItem('meta')

	return {
		type: DEAUTHENTICATE
	}
}
