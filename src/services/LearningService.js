import axios from 'axios';
// const API_URL = '';

class LearningService {
    async getLabInfo() {
        // const url = `${API_URL}/lab/{{lab_id}}/fetch`;
        const url = 'https://60c44f49-e9b9-4587-b8c9-3dbe7647af8b.mock.pstmn.io/lab/1/fetch';
        return axios.get(url).then(response => response.data);
    }
}

export default LearningService;