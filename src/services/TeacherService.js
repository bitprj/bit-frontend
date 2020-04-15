import { backend } from './AxiosInstances'

export const fetchTeacherData = teacherId => {
	const endpoint = `teachers/${teacherId}`
	return backend.get(endpoint)
}

export const fetchClassroom = classroomId => {
	const endpoint = `classrooms/${classroomId}`
	return backend.get(endpoint)
}

export const fetchSubmissionsAll = classroomId => {
	const endpoint = `classrooms/${classroomId}/activities`
	return backend.get(endpoint)
	// .then(() => [
	// 	{
	// 		studentId: 2,
	// 		activityId: 12,
	// 		checkpoints: [
	// 			{
	// 				checkpointId: 18,
	// 				content:
	// 					'https://projectbit.s3-us-west-1.amazonaws.com/Github/checkpoints/de9c0ea4-7142-11ea-ab93-acde48001122bandanna.jpg',
	// 				studentComment:
	// 					'Here is a picture of my most favorite character in existence. Hope you enjoy!'
	// 			},
	// 			{
	// 				checkpointId: 19,
	// 				content:
	// 					'https://projectbit.s3-us-west-1.amazonaws.com/Github/checkpoints/2d1738c0-7142-11ea-ae5b-acde48001122bandanna.jpg',
	// 				studentComment:
	// 					"Yeah this isn't a video. I sent a waddle dee instead. Wonder how? I hacked the system."
	// 			},
	// 			{
	// 				// mc
	// 				checkpointId: 20,
	// 				content: 'Hello World',
	// 				studentComment: null
	// 			},
	// 			{
	// 				// sa
	// 				checkpointId: 22,
	// 				content: 'Hello World',
	// 				studentComment: null
	// 			},
	// 			{
	// 				// ag
	// 				checkpointId: 21,
	// 				content: {
	// 					submissions: [
	// 						{
	// 							results: {
	// 								failCase: {
	// 									expected: [
	// 										'Mines: 8',
	// 										'0123456',
	// 										'0 XXXXXXX 0',
	// 										'1 XXXXXXX 1',
	// 										'2 XXXMXXX 2',
	// 										'3 XXXXXXX 3',
	// 										'4 XXXXXXF 4',
	// 										'5 XXXXXXX 5',
	// 										'6 XXXXXXX 6',
	// 										'0123456'
	// 									],
	// 									name: 'TODO',
	// 									output: [
	// 										'Mines: 8',
	// 										'0123456',
	// 										'0 XXXXXXX 0',
	// 										'1 XXXXXXX 1',
	// 										'2 XXX3XXX 2',
	// 										'3 XXXXXXX 3',
	// 										'4 XXXXXXF 4',
	// 										'5 XXXXXXX 5',
	// 										'6 XXXXXXX 6',
	// 										'0123456'
	// 									]
	// 								},
	// 								numFail: 1,
	// 								numPass: 0,
	// 								passCases: []
	// 							},
	// 							datetime: '2020-03-29T12:49:26.425117'
	// 						}
	// 					]
	// 				},
	// 				studentComment: null
	// 			}
	// 		]
	// 	}
	// ])
	// .then(submissions =>
	// 	submissions.map(submission => ({
	// 		...submission,
	// 		checkpoints: submission.checkpoints.map(checkpoint => ({
	// 			...checkpoint,
	// 			contentUrl: checkpoint.contentUrl ?? checkpoint.checkpoint?.contentUrl
	// 		}))
	// 	}))
	// )
	// .then(_ => console.log(_) ?? _)
}

/**
 * {
 *   "student_id": "69",
 *   "checkpoints": [
 *     {
 *       "checkpoint_id": "69",
 *       "is_passed": "true",
 *       "comment": "I am a comment"
 *     },
 *     {
 *       "checkpoint_id": "32",
 *       "is_passed": "false",
 *       "comment": "asdfasdf"
 *     }
 *   ]
 * }
 */
export const gradeSubmission = (activityId, data) => {
	const endpoint = `teachers/${activityId}/grade`
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
