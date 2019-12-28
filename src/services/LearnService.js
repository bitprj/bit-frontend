import axios from 'axios';

import { API_URL } from './API_URL';

class LearnService {
    async getActivityInfo(labID) {
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

    async unlockHint(labID, cardID, hintID) {
        const url = `${API_URL}/lab/${labID}/card/${cardID}/hint/${hintID}/unlock`;
        return axios.get(url).then(response => response.data);
    }
}

export default LearnService;