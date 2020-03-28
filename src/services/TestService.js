import { backend } from './AxiosInstances'

export const ping = async () => {
	// await backend.get('/auth').catch(() => {})

	const startTime = new Date()
	const ping = (await backend.get('ping')).message
	const endTime = new Date()
	console.log(ping + ':', endTime - startTime + 'ms')
}
