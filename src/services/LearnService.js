import { backend, backendSaves, grader } from './AxiosInstances'

/* ===== INITIAL */

export const fetchActivityProgress = activityId => {
	const endpoint = `/activities/${activityId}/progress`
	return backend.get(endpoint)
}

export const fetchActivitySkeleton = activityId => {
	const endpoint = `/activities/${activityId}`
	return backend.get(endpoint)
}

export const fetchCardStatus = (activityId, cardId) => {
	const endpoint = `/activities/${activityId}/cards/${cardId}`
	return backend.get(endpoint)
}

export const fetchCheckpointProgress = checkpointId => {
	const endpoint = `/checkpoints/${checkpointId}/progress`
	return backend.get(endpoint)
}

/* ===== RUNTIME */

export const deleteActivityProgress = activityId => {
	const endpoint = `/activities/${activityId}/progress`
	return backendSaves.delete(endpoint)
}

export const unlockCard = (activityId, cardId) => {
	const endpoint = `/activities/${activityId}/cards/${cardId}`
	return backendSaves.put(endpoint)
}

export const unlockHint = (activityId, hintId) => {
	const endpoint = `/activities/${activityId}/hints/${hintId}`
	return backendSaves.put(endpoint)
}

export const submitCheckpointProgress = (
	activityId,
	checkpointId,
	type,
	content
) => {
	let data
	let formData = new FormData()

	switch (type) {
		case 'Video':
		case 'Image':
		case 'Autograder': {
			formData.append('content', content)
			break
		}

		case 'Multiple Choice': {
			break
		}

		case 'Short Answer': {
			break
		}
	}

	if (data) {
		data.activity_id = activityId
		data.checkpoint_id = checkpointId
		data.username = 'Student@example.com'
		return grader.put('', data)
	}
	formData.append('activity_id', activityId)
	formData.append('checkpoint_id', checkpointId)
	formData.append('username', 'Student@example.com')
	return grader.post('/uploader', formData)
}
