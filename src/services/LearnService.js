import axios from 'axios';

import { API_URL, UPLOAD_URL } from './API_URL';

class LearnService {
    // async getActivityInfo(labID) {
    //     const url = `${API_URL}/lab/${labID}/fetch`;
    //     return axios.get(url).then(response => response.data);
    // }

    // // async getCard(cardID) {
    // //     const url = `${API_URL}/cards/${cardID}`;
    // //     return axios.get(url).then(response => response.data);
    // // }

    // async getHint(hintID) {
    //     const url = `${API_URL}/hints/${hintID}`;
    //     return axios.get(url).then(response => response.data);
    // }

    // async unlockHint(labID, cardID, hintID) {
    //     const url = `${API_URL}/lab/${labID}/card/${cardID}/hint/${hintID}/unlock`;
    //     return axios.get(url).then(response => response.data);
    // }

    async getHintStatus(labID, cardID) {
        const url = `${API_URL}/lab/${labID}/card/${cardID}/fetch`;
        return axios.get(url).then(response => response.data);
    }

    async processHintStatus(data) {
        const unlocks = data.hints_unlocked.map(hint => {
            return {
                id: hint.contentful_id,
                isLocked: false
            }
        });

        const locks = data.hints_locked.map(hint => {
            return {
                id: hint.contentful_id,
                isLocked: true
            }
        });

        return [...unlocks, ...locks];
    }

    async uploadFiles(files) {
        let srcFile = null;
        let testsFile = null;
        let token = localStorage.getItem('token');

        files.forEach(file => {
            if (file.filename === 'src.zip') {
                srcFile = file;
            } else if (file.filename === 'tests.zip') {
                testsFile = file;
            }
        })

        return axios.get(UPLOAD_URL).then(response => console.log(response))

        // if (srcFile && testsFile) {
        //     const formattedData = {
        //         src: srcFile,
        //         tests: testsFile,
        //         jwt_token: token
        //     };
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': 'https://darlene-okpy.herokuapp.com/uploader'
        //     }


        //     axios.post(UPLOAD_URL, formattedData, { crossdomain: true })
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        //     return 'dung ui!';
        // } else {
        //     const err = new Error('du ma may');
        //     throw err;
        // }
    }
}

export default LearnService;
