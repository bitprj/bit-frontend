import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

/** GENERAL BACKEND (mainly for GET) */

const backendBaseURL = 'https://darlene-backend.herokuapp.com/'
// const backendBaseURL = 'https://bit-backend-auth0.herokuapp.com/'

export const backend = axios.create({
	baseURL: backendBaseURL,
	withCredentials: true
})
backend.interceptors.response.use(
	response => camelCase(response.data, { deep: true }),
	error => {
		const {
			status,
			statusText,
			config: { method, url },
			data: { message, msg }
		} = error.response
		console.log(error.response)

		if (status !== 401) {
			alert(`${method.toUpperCase()} ${url}
         ${status} (${statusText})
         ${message ?? msg ?? ''}`)
		} else {
			if (window.location.pathname !== '/') {
				// window.location.replace('/?authModal=true')
			}
		}
		return error
	}
)

export const backendSaves = axios.create({
	baseURL: backendBaseURL,
	withCredentials: true
})

/** BACKEND_SAVES (with CSRF, mainly for PUT, POST, DELETE) */

let pending = 0
// window.onbeforeunload = e => {
// 	e.preventDefault()
// 	e.returnValue('Changes may not be saved. Continue?')
// 	return 'Changes may not be saved. Continue?'
// }

backendSaves.interceptors.request.use(request => {
	request.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf-token')
	pending++
	return request
})
backendSaves.interceptors.response.use(
	response => camelCase(response.data, { deep: true }),
	error => {
		const {
			status,
			statusText,
			config: { method, url },
			data: { message, msg }
		} = error.response
		console.log(error.response)

		// if (status !== 401) {
		alert(`${method.toUpperCase()} ${url}
         ${status} (${statusText})
         ${message ?? msg ?? ''}`)
		// } else {
		// 	if (window.location.pathname !== '/') {
		// 		window.location.replace('/?authModal=true')
		// 	}
		// }
		return error
	}
)

const graderBaseURL = 'https://darlene-autograder.herokuapp.com/'
export const grader = axios.create({
	baseURL: graderBaseURL
	// withCredentials: true
})
grader.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)
// grader.interceptors.response.use(response => response.data);
