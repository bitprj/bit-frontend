import { backend } from './AxiosInstances';

class StudentService {
    /**
     * GET request for getting Student data
     */
    async getStudentInfo() {
        const endpoint = 'students/data';
        return backend.get(endpoint);
    }

    /**
     * GET request for getting track data
     * @param {String} trackID
     */
    async getTrack(trackID) {
        const endpoint = `tracks/${trackID}`;
        return backend.get(endpoint);
    }

    async getTrackProgress(trackID) {
        const endpoint = `tracks/${trackID}/progress`;
        return backend.get(endpoint);
    }

    /**
     * GET request for getting topic data
     * @param {String} topicID
     */
    async getTopic(topicID) {
        const endpoint = `topics/${topicID}`;
        return backend.get(endpoint);
    }

    /**
     * GET request for getting activity data
     * @param {String} activityID
     */
    async getActivity(activityID) {
        const endpoint = `activities/${activityID}`;
        return backend.get(endpoint);
    }
}

export default StudentService;
