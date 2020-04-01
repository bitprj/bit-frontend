import { backend } from './AxiosInstances'

export const autoFetch = async (id, cacheType) => {
	const [type, params] = cacheType
		.replace('cached', '')
		.split(/(?=[A-Z])/)
		.map(w => w.toLowerCase())

	const endpoint = `/${type}/${id}` + (params ? `/${params}` : '')
	return backend.get(endpoint).catch(e => ({}))
}
