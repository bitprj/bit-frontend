import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

/** GENERAL BACKEND (mainly for GET) */

// const backendBaseURL = 'https://bit-backend.azurewebsites.net/'
const backendBaseURL = 'https://darlene-backend.herokuapp.com/'
// const backendBaseURL = 'https://bit-backend-auth0.herokuapp.com/'

export const backend = axios.create({
	baseURL: backendBaseURL,
	withCredentials: true
})
backend.interceptors.request.use(request => {
	request.headers['Authorization'] = `Bearer ${
		localStorage.getItem('jwt-token') ||
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU4Nzk2OTksIm5iZiI6MTU4NTg3OTY5OSwianRpIjoiYWQ3ZjYzNDItYTc5MC00YTA4LWI0OGEtMzRmOGMxMjllNTFlIiwiaWRlbnRpdHkiOiJTdHVkZW50QGV4YW1wbGUuY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsicm9sZXMiOiJTdHVkZW50In19.J6fFOCheP-F87vjUYVl0j-6vmtDIBPAXK12NpksLyhs'
	}`
	return request
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

/** BACKEND_SAVES (with CSRF, mainly for PUT, POST, DELETE) */

let pending = 0
// window.onbeforeunload = e => {
// 	e.preventDefault()
// 	e.returnValue('Changes may not be saved. Continue?')
// 	return 'Changes may not be saved. Continue?'
// }

backendSaves.interceptors.request.use(request => {
	request.headers['X-CSRF-TOKEN'] = localStorage.getItem('csrf-token')
	request.headers['Authorization'] = `Bearer ${
		localStorage.getItem('jwt-token') ||
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1ODU4Nzk2OTksIm5iZiI6MTU4NTg3OTY5OSwianRpIjoiYWQ3ZjYzNDItYTc5MC00YTA4LWI0OGEtMzRmOGMxMjllNTFlIiwiaWRlbnRpdHkiOiJTdHVkZW50QGV4YW1wbGUuY29tIiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIiwidXNlcl9jbGFpbXMiOnsicm9sZXMiOiJTdHVkZW50In19.J6fFOCheP-F87vjUYVl0j-6vmtDIBPAXK12NpksLyhs'
	}`
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

		if (status !== 401) {
			if (message !== 'Card already unlocked')
				alert(`${method.toUpperCase()} ${url}
         ${status} (${statusText})
         ${message ?? msg ?? ''}`)
		} else {
			if (window.location.pathname !== '/') {
				window.location.replace('/?authModal=true')
			}
		}
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

const cdnBaseUrl = 'https://d36nt3c422j20i.cloudfront.net/'
export const cdn = axios.create({
	baseURL: cdnBaseUrl
})
cdn.interceptors.response.use(response =>
	camelCase(response.data, { deep: true })
)
