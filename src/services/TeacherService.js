import { backend } from './AxiosInstances';

class TeacherService {
    async getSubmissions(classroomID) {
        const endpoint = `/teachers/${classroomID}/grade`;
        return backend.get(endpoint);
    }
}

export default TeacherService;
