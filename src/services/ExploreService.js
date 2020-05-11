import { backend } from './AxiosInstances'
/*
GET request for getting module progress data
 */
export const fetchModuleProgress = moduleId => {
	const endpoint = `modules/${moduleId}/progress`
	return backend.get(endpoint);
}

/*
GET request for getting module data
 */
export const fetchModuleData = moduleId => {
	const endpoint = `modules/${moduleId}`
	return backend.get(endpoint);
}
