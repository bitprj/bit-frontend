import { backend, cdn } from './AxiosInstances'

export const autoFetch = async (id, cacheType) => {
	const [type, params] = cacheType
		.replace('cached', '')
		.split(/(?=[A-Z])/)
		.map(w => w.toLowerCase())

	const endpoint = `/${type}/${id}` + (params ? `/${params}` : '')

	if (!params) {
		try {
			const data = await cdn.get(`${endpoint}/data.json`)
			return data
		} catch (e) {
			if (e.response.status === 401)
				console.log(
					'[Content Service] Content not found on CDN. Fetching to servers...'
				)
		}
	}
	return backend.get(endpoint).catch(e => {
		console.log(e)
		return {}
	})
}
