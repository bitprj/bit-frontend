import axios from 'axios';

const API_URL = 'https://b2757d6e-6fd4-4877-887f-7cc9531408a8.mock.pstmn.io';

class LearningService {
    async getLabInfo(labID) {
        const url = `${API_URL}/lab/${labID}/fetch`;
        return axios.get(url).then(response => response.data);
    }

    async getCard(cardID) {
        const url = `${API_URL}/cards/${cardID}`;
        return axios.get(url).then(response => response.data);
    }

    async getHint(hintID) {
        const url = `${API_URL}/hints/${hintID}`;
        return axios.get(url).then(response => response.data);
    }
}

export default LearningService;