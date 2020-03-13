import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

// const backendBaseURL = 'https://345e1dd1.ngrok.io/'

/** GENERAL BACKEND (mainly for GET) */

const backendBaseURL = 'https://darlene-backend.herokuapp.com/'
export const backend = axios.create({
	baseURL: backendBaseURL,
	withCredentials: true
})
backend.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
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

// const graderBaseURL = 'https://secure-escarpment-83921.herokuapp.com/'
const graderBaseURL = 'https://darlene-autograder.herokuapp.com/'
export const grader = axios.create({
	baseURL: graderBaseURL
	// withCredentials: true
})
grader.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)
// grader.interceptors.response.use(response => response.data);
