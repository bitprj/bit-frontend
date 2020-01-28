import { backend } from './AxiosInstances';

class TeacherService {
    async getSubmissions(classroomID) {
        const endpoint = `/teachers/${classroomID}/grade`;
        return backend.get(endpoint);
    }

    async submitFeedbacks(classroomID, submissionID, feedbacks) {
        const endpoint = `/teachers/${classroomID}/grade`;
        const checkpoints_passed = [];
        const checkpoints_failed = [];
        for (const feedback of feedbacks) {
            if (feedback.passed) {
                checkpoints_passed.push({
                    id: feedback.id,
                    comment: feedback.comment
                });
            } else {
                checkpoints_failed.push({
                    id: feedback.id,
                    comment: feedback.comment
                });
            }
        }
        const data = {
            activity_progress_id: submissionID, // probably something else here
            checkpoints_passed: [...checkpoints_passed],
            checkpoints_failed: [...checkpoints_failed]
        }
        return backend.put(endpoint, data);
    }
}

export default TeacherService;
