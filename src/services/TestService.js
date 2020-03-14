import { backend } from './AxiosInstances'

export const ping = async () => {
	const startTime = new Date()
	const ping = (await backend.get('ping')).message
	const endTime = new Date()
	console.log(ping + ':', endTime - startTime + 'ms')
}
