import { AUTHENTICATE, DEAUTHENTICATE } from '../actionTypes'

export const authenticate = userType => {
	localStorage.setItem('userType', userType)
	return {
		type: AUTHENTICATE,
		userType
	}
}

export const deauthenticate = () => {
	localStorage.setItem('userType', 'VISITOR')
	localStorage.removeItem('csrf-token')
	localStorage.removeItem('jwt-token')
	return {
		type: DEAUTHENTICATE
	}
}
