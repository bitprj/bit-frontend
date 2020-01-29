import { backend } from './AxiosInstances'

/**
 * GET request for getting Student data
 */
export const getStudentInfo = () => {
	const endpoint = 'students/data'
	return backend.get(endpoint)
}

/**
 * GET request for getting track data
 * @param {String} trackID
 */
export const getTrack = trackID => {
	const endpoint = `tracks/${trackID}`
	return backend.get(endpoint)
}

export const getTrackProgress = trackID => {
	const endpoint = `tracks/${trackID}/progress`
	return backend.get(endpoint)
}

/**
 * GET request for getting topic data
 * @param {String} topicID
 */
export const getTopic = topicID => {
	const endpoint = `topics/${topicID}`
	return backend.get(endpoint)
}

/**
 * GET request for getting activity data
 * @param {String} activityID
 */
export const getActivity = activityID => {
	const endpoint = `activities/${activityID}`
	return backend.get(endpoint)
}
