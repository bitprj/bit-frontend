import AuthService from '../../services/AuthService'

import * as actionTypes from '../utils/actionTypes'

const authService = new AuthService()

// const addLoginTrace = () => {
//   return {
//     type: actionTypes.LOGIN
//   };
// };

export const initLogin = (user, pass, callback) => {
	console.log(user, pass, callback)
	return dispatch => {
		authService
			.postLogin(user, pass)
			.then(response => {
				alert('successful! now go redirect yourself\nGo to the `Community` Tab')
				callback()
			})
			.catch(error => {
				alert('try again.', error)
				callback()
			})
	}
}
// remove logintrace
export const logout = () => {
	return {
		type: actionTypes.LOGOUT
	}
}

export const initLogout = () => {}
