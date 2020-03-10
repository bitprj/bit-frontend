import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

const baseURL = 'https://darlene-backend.herokuapp.com/'

/** GENERAL BACKEND (mainly for GET) */

export const backend = axios.create({
	baseURL,
	withCredentials: true
})
backend.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)

export const backendSaves = axios.create({
	baseURL,
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
	console.log(pending)
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

export const grader = axios.create({
	baseURL: 'https://darlene-autograder.herokuapp.com/',
	withCredentials: true
})

// grader.interceptors.response.use(response => response.data);
