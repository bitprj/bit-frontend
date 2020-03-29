import { backend } from './AxiosInstances'

export const checkLogin = () => {
	const endpoint = 'protected'
	return backend.get(endpoint)
}

export const login = ({ username, password }) => {
	const endpoint = 'user/login'
	return backend.post(endpoint, { username, password })
}

export const signUp = ({ name, username, password, classCode }) => {
	const endpoint = '/users/Student/create'
	console.log({
		name,
		username,
		password,
		class_code: classCode,
		image: 'uwu.png',
		location: 'Davis',
		track_id: 1
	})
	return backend.post(endpoint, {
		name,
		username,
		password,
		class_code: classCode,
		image: 'uwu.png',
		location: 'Davis',
		track_id: 1
	})
}

export const logout = () => {
	const endpoint = 'user/logout'
	return backend.delete(endpoint)
}
