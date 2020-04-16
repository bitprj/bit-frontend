import { AUTHENTICATE, DEAUTHENTICATE, SET_USER_DATA } from '../actionTypes'
import { fetchUserData } from '../../services/AccountService'

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
	localStorage.removeItem('meta')

	if (window.location.pathname !== '/') {
		console.log('ok')
		window.location.replace('/')
	}

	return {
		type: DEAUTHENTICATE
	}
}
