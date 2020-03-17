import { backend } from './AxiosInstances'

export const fetchClassroom = classroomId => {
	const endpoint = `classrooms/${classroomId}`
	return backend.get(endpoint)
}

export const fetchSubmissions = classroomId => {
	const endpoint = `teachers/${classroomId}/grade`
	return backend.get(endpoint).then(() => [
		{
			id: 31,
			student: {
				name: 'S. Gupta'
			},
			activity: {
				name: 'Intro to Command Line'
			},
			checkpoints: [
				{
					checkpointId: 12,
					name: 'Checkpoint 1',
					isCompleted: true,
					content: 'https://wallpaperplay.com/walls/full/4/1/c/16935.jpg',
					type: 'Image'
				},
				{
					checkpointId: 13,
					name: "Check me pls :')",
					isCompleted: true,
					content:
						'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg',
					type: 'Image'
				},
				{
					checkpointId: 14,
					name: 'Grader',
					isCompleted: true,
					content:
						'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Snow%20Falling%20Down.mp4',
					type: 'Video'
				}
			]
		},
		{
			id: 29,
			student: {
				name: 'K. Denial'
			},
			activity: {
				name: 'Cava'
			},
			checkpoints: [
				{
					checkpointId: 12,
					name: 'Checkpoint 1',
					isCompleted: true,
					content:
						'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg',
					type: 'Image'
				},
				{
					checkpointId: 13,
					name: "Check me pls :')",
					isCompleted: true,
					content:
						'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Image%20from%20iOS.jpg',
					type: 'Image'
				},
				{
					checkpointId: 14,
					name: 'Grader',
					isCompleted: true,
					content:
						'https://projectbit.s3-us-west-1.amazonaws.com/darlene/checkpoints/Snow%20Falling%20Down.mp4',
					type: 'Video'
				}
			]
		}
	])
}

export const gradeActivity = classroomId => {
	const endpoint = `teachers/${classroomId}/grade`
	const data = {}
	return backend.put(endpoint, data)
}

// @unused
class TeacherService {
	async getSubmissions(classroomID) {
		const endpoint = `/teachers/${classroomID}/grade`
		return backend.get(endpoint)
	}

	async submitFeedbacks(classroomID, submissionID, feedbacks) {
		const endpoint = `/teachers/${classroomID}/grade`
		const checkpoints_passed = []
		const checkpoints_failed = []
		for (const feedback of feedbacks) {
			if (feedback.passed) {
				checkpoints_passed.push({
					id: feedback.id,
					comment: feedback.comment
				})
			} else {
				checkpoints_failed.push({
					id: feedback.id,
					comment: feedback.comment
				})
			}
		}
		const data = {
			activity_progress_id: submissionID, // probably something else here
			checkpoints_passed: [...checkpoints_passed],
			checkpoints_failed: [...checkpoints_failed]
		}
		return backend.put(endpoint, data)
	}
}

export default TeacherService
