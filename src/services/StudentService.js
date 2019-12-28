import axios from 'axios';

import { API_URL } from './API_URL';

class StudentService {
    async getStudentInfo(token) {
        const url = `${API_URL}/students/data`;
        return axios.get(url).then(response => response.data);
    }

    async getTopic(topicID) {
        const url = `${API_URL}/topics/${topicID}`;
        return axios.get(url).then(response => response.data);
    }

    async getTrack(trackID) {
        const url = `${API_URL}/tracks/${trackID}`;
        return axios.get(url).then(response => response.data);
    }
}

export default StudentService;