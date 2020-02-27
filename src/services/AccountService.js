import { backend } from './AxiosInstances'

export const checkLogin = () => {
	const endpoint = 'protected'
	return backend.get(endpoint)
}

export const login = (username, password) => {
	const endpoint = 'user/login'
	return backend.post(endpoint, { username, password })
}

export const logout = () => {
	const endpoint = 'user/logout'
	return backend.delete(endpoint)
}
