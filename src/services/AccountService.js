import { baseUrl, backend } from './AxiosInstances'

export const fetchMetaData = () => {
	const endpoint = '/meta'
	return backend.get(endpoint)
}

export const fetchUserData = userId => {
  const endpoint = `/users/${userId}`
  return backend.get(endpoint)
}

export const login = () => {
	window.location.href = `${baseUrl}/login`
	// const endpoint = '/login'
	// return backend.get(endpoint)
}

export const logout = () => {
	const endpoint = '/logout'
	return backend.get(endpoint)
}
