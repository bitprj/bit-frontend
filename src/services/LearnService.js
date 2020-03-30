import { backend, backendSaves, grader } from './AxiosInstances'

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
	const backendEndpoint = `checkpoints/${checkpointId}/progress`

	const formData = new FormData()
	formData.append('content', content)
	formData.append('comment', '')

	if (type === 'Autograder') {
		formData.append('activity_id', activityId)
		formData.append('checkpoint_id', checkpointId)
		formData.append('username', 'Student@example.com')
		return grader.post('/uploader', formData)
	}
	return backendSaves.put(backendEndpoint, formData)
}
