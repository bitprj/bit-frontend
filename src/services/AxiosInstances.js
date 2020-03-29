import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

/** GENERAL BACKEND (mainly for GET) */

const backendBaseURL = 'https://darlene-backend.herokuapp.com/'
// const backendBaseURL = 'https://080f200e.ngrok.io/'
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
			data: { message }
		} = error.response
		console.log(error.response)

		if (status !== 401) {
			alert(`${method.toUpperCase()} ${url}
         ${status} (${statusText})
         ${message}`)
		} else {
			if (window.location.pathname !== '/') {
				window.location.replace('/?authModal=true')
			}
		}
		return error
	}
)

export const backendSaves = axios.create({
	baseURL: backendBaseURL,
	withCredentials: true
})
backendSaves.defaults.headers.common['X-CSRF-TOKEN'] = localStorage.getItem(
	'csrf-token'
)

/** BACKEND_SAVES (with CSRF, mainly for PUT, POST, DELETE) */

let pending = 0
// window.onbeforeunload = e => {
// 	e.preventDefault()
// 	e.returnValue('Changes may not be saved. Continue?')
// 	return 'Changes may not be saved. Continue?'
// }

backendSaves.interceptors.request.use(response => {
	pending++
	return response
})
backendSaves.interceptors.response.use(
	response => {
		pending--
		return camelCase(response.data, { deep: true })
	},
	error => {
		pending--
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
