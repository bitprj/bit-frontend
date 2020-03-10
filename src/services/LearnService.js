import { backend, backendSaves, grader } from './AxiosInstances'

export const fetchActivityProgress = activityId => {
	const endpoint = `/activities/${activityId}/progress`
	return backend.get(endpoint)
}

export const fetchActivity = activityId => {
	const endpoint = `/activities/${activityId}`
	return backend.get(endpoint)
}

export const fetchCardStatus = (activityId, cardId) => {
	const endpoint = `/activities/${activityId}/cards/${cardId}`
	return backend.get(endpoint)
}

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

export const submitCheckpointProgress = (checkpointId, type, content) => {
	const endpoint = `/checkpoints/${checkpointId}/submit`
	let data
	let formData = new FormData()
	switch (type) {
		case 'Autograder': {
			formData.append('content', content[0])
			break
		}

		case 'Image': {
			formData.append('content', content[0])
			break
		}

		case 'Video': {
			break
		}

		case 'Multiple Choice': {
			break
		}

		case 'Short Answer': {
			break
		}
	}
	console.log(data, formData)
	return backendSaves.put(endpoint, data || formData)
}

// @ half unused

// export const uploadFiles = fileItems => {
// 	let srcFile = null
// 	let testsFile = null

// 	fileItems.forEach(fileItem => {
// 		if (fileItem.filename === 'src.zip') {
// 			srcFile = fileItem.file
// 		} else if (fileItem.filename === 'tests.zip') {
// 			testsFile = fileItem.file
// 		}
// 	})

// 	if (srcFile && testsFile) {
// 		let formData = new FormData()
// 		formData.append('src', srcFile)
// 		formData.append('tests', testsFile)
// 		formData.append('checkpoint_id', 12)

// 		return grader
// 			.post('/uploader', formData)
// 			.then(response => response.data)
// 			.catch(err => {
// 				console.log(err)
// 			})
// 	} else {
// 		const err = new Error(
// 			'Invalid Files - Submit exactly one src.zip and one tests.zip file.'
// 		)
// 		throw err
// 	}
// }

// export const processResult = rawData => {
// 	const passCases = rawData.pass_cases.map(pass => {
// 		return pass
// 	})

// 	const result = {
// 		submission: rawData.submission,
// 		passCases: passCases,
// 		failCase: rawData.fail_case,
// 		numFail: rawData.num_fail,
// 		numPass: rawData.num_pass
// 	}

// 	return result
// }

// // @unused

// export const getHintStatus = (labID, cardID) => {
// 	const endpoint = `/lab/${labID}/card/${cardID}/fetch`
// 	return backend.get(endpoint)
// }

// export const processHintStatus = rawData => {
// 	const hints = rawData.map(hint => {
// 		const children = hint.hint_children.map(child => {
// 			return {
// 				dbID: child.hint.id,
// 				id: child.hint.contentful_id,
// 				isLocked: !child.is_unlocked
// 			}
// 		})
// 		return {
// 			dbID: hint.hint.id,
// 			id: hint.hint.contentful_id,
// 			isLocked: !hint.is_unlocked,
// 			children: children
// 		}
// 	})

// 	return hints
// }
