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
	if (type === 'students') {
		return backend.get('/students/data?student_id=' + id)
	}

	const endpoint = `/${type}/${id}` + (params ? `/${params}` : '')

	if (!params && FETCH_FROM_CDN) {
		try {
			const data = await cdn.get(`${endpoint}/data.json`)
			return data
		} catch (e) {
			console.log(
				'[Content Service] Error fetching from CDN. Moving to servers...'
			)
			if (e.response?.status === 404)
				console.log(
					'[Content Service] The above error was due to missing content'
				)
		}
	}
	return backend.get(endpoint)
}
