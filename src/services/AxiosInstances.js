import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

export const backend = axios.create({
	baseURL: 'https://darlene-backend.herokuapp.com/',
	withCredentials: true
})
backend.interceptors.request.use(
	request => {
		return request
	},
	error => {
		return error
	}
)
backend.interceptors.response.use(response => {
	return camelCase(response.data, { deep: true })
})

export const grader = axios.create({
	baseURL: 'https://darlene-autograder.herokuapp.com/',
	withCredentials: true
})

// grader.interceptors.response.use(response => response.data);
