import { backend, cdn } from './AxiosInstances'

const FETCH_FROM_CDN = true

export const autoFetch = async (id, cacheType) => {
	const [type, params] = cacheType
		.replace('cached', '')
		.split(/(?=[A-Z])/)
		.map(w => w.toLowerCase())

	/**
	 * TEMP SPECIAL
	 */
	if (type === 'users') {
		return backend.get(`/users/${id}`)
	}
	if (type === 'students') {
		return backend.get(`/students/${id}`)
	}

	const endpoint = `/${type}/${id}` + (params ? `/${params}` : '')

	if (!params && FETCH_FROM_CDN) {
		try {
			const data = await cdn.get(`${endpoint}/data.json`)
			return data
		} catch (e) {
			console.log(
				'[ContentService] Error fetching from CDN. Moving to servers...'
			)
			if (e.response?.status === 404)
				console.log(
					'[ContentService] The above error was due to missing content'
				)
		}
	}
	return backend.get(endpoint)
}
