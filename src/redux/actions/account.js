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
	document.cookie = 'csrf-token=John Doe; expires=Thu, 01 Jan 1970 00:00:00 UTC'
	return {
		type: DEAUTHENTICATE
	}
}
