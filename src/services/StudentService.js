import axios from 'axios';

class StudentService {
    async getCurrentTrack() {
        // const url = `${API_URL}/lab/{{lab_id}}/fetch`;
        const url = 'https://b52cc6f9-6c0c-409e-b757-f09a7c4aeb11.mock.pstmn.io/tracks/1';
        return axios.get(url).then(response => response.data);
    }
}

export default StudentService;