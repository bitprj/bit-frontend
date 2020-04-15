import { backend, backendSaves } from './AxiosInstances'

/**
 * GET request for getting Student data
 */
export const fetchStudentData = studentId => {
	const endpoint = `/students/${studentId}`
	return backend.get(endpoint)
}

/** ===== RUNTIME */

export const joinClassroom = classCode => {
	const endpoint = '/students/classrooms'
	return backendSaves.put(endpoint, { class_code: classCode })
}

export const setSuggestedActivity = (id, moduleId) =>
	updateStudentData({
		suggested_activity: {
			id,
			module_id: moduleId
		}
	})

export const setChosenProjects = (moduleId, chosenProjects) =>
	updateModuleProgress(moduleId, {
		chosen_project_ids: chosenProjects.map(p => p.id)
	})

const updateStudentData = updates => {
	const endpoint = `/students/data`
	return backendSaves.put(endpoint, updates)
}

const updateModuleProgress = (id, updates) => {
	const endpoint = `/modules/${id}/progress`
	return backendSaves.put(endpoint, updates)
}

//

//@unused
/**
 * GET request for getting track data
 * @param {String} trackID
 */
export const fetchTrack = trackID => {
	const endpoint = `tracks/${trackID}`
	return backend.get(endpoint)
}

export const fetchTrackProgress = trackID => {
	const endpoint = `tracks/${trackID}/progress`
	return backend.get(endpoint)
}

/**
 * GET request for getting topic data
 * @param {String} topicID
 */
export const fetchTopic = topicID => {
	const endpoint = `topics/${topicID}`
	return backend.get(endpoint)
}
