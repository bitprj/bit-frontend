import { backend } from './AxiosInstances'

/**
 * GET request for getting Student data
 */
export const fetchStudentInfo = () => {
	const endpoint = '/students/data'
	return backend.get(endpoint)
}

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

/**
 * GET request for getting activity data
 * @param {String} activityID
 */
export const fetchActivity = activityID => {
	const endpoint = `activities/${activityID}`
	return backend.get(endpoint)
}
