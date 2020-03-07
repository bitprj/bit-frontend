import axios from 'axios'
import camelCase from 'camelcase-keys-deep'

const getCookie = cookieName => {
	const name = cookieName + '='
	const decodedCookie = decodeURIComponent(document.cookie)
	const ca = decodedCookie.split(';')
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) == ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}

export const backend = axios.create({
	baseURL: 'https://darlene-backend.herokuapp.com/',
	withCredentials: true
})
backend.defaults.headers.put['X-CSRF-TOKEN'] = getCookie('csrf-token')
backend.defaults.headers.post['X-CSRF-TOKEN'] = getCookie('csrf-token')
backend.defaults.headers.delete['X-CSRF-TOKEN'] = getCookie('csrf-token')
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
