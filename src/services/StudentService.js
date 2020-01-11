import axios from "axios";

import { API_URL } from "./API_URLs";

class StudentService {
    /**
     * GET request for getting Student data
     */
    async getStudentInfo() {
        const url = `${API_URL}/students/data`;
        return axios
            .get(url, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            })
            .then(response => response.data);
    }

    /**
     * GET request for getting track data
     * @param {String} trackID
     */
    async getTrack(trackID) {
        const url = `${API_URL}/tracks/${trackID}`;
        return axios.get(url).then(response => response.data);
    }

    async getTrackProgress(trackID) {
        const url = `${API_URL}/tracks/${trackID}/progress`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * GET request for getting topic data
     * @param {String} topicID
     */
    async getTopic(topicID) {
        const url = `${API_URL}/topics/${topicID}`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * GET request for getting activity data
     * @param {String} activityID
     */
    async getActivity(activityID) {
        const url = `${API_URL}/activities/${activityID}`;
        return axios.get(url).then(response => response.data);
    }
}

export default StudentService;
