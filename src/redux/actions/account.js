import { AUTHENTICATE, DEAUTHENTICATE } from '../utils/actionTypes'

export const authenticate = userType => {
	localStorage.setItem('userType', userType)
	return {
		type: AUTHENTICATE,
		userType
	}
}

export const deauthenticate = () => {
	localStorage.removeItem('userType')
	return {
		type: DEAUTHENTICATE
	}
}
