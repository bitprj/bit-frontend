import { backend } from './AxiosInstances'

export const checkLogin = () => {
	const endpoint = '/protected'
	return backend.get(endpoint)
}

export const login = ({ username, password }) => {
	const endpoint = '/auth'
	return backend.post(endpoint, { username, password })
}

export const signUp = ({ name, username, password }) => {
	const endpoint = '/users/Student/create'
	return backend.post(endpoint, {
		name,
		username,
		password,
		image: 'uwu.png',
		location: 'Davis'
	})
}

export const logout = () => {
	const endpoint = '/auth'
	return backend.delete(endpoint)
}
