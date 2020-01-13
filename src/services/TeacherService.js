import axios from "axios";

import { API_URL } from "./API_URLs";

class TeacherService {
    async getSubmissions(classroomID) {
        const url = `${API_URL}/teachers/${classroomID}/grade`;
        return axios.get(url).then(response => response.data);
    }
}

export default TeacherService;
