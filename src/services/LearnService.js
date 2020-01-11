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

        // return axios.get(UPLOAD_URL).then(response => console.log(response))
        const headers = {
            'Content-Type': 'application/multipart/form-data',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
        }

        let formData = new FormData();

        formData.append('name', 'wee');
        formData.append('src', files[0].file);
        formData.append('tests', files[1].file);
        formData.append('jwt_token', token);
        formData.append('checkpoint_id', 12)


        let request = new XMLHttpRequest();
        request.open('POST', UPLOAD_URL);
        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState == XMLHttpRequest.DONE) {
                console.log(request.responseText);
            }
        }

        // if (srcFile && testsFile) {
        //     const formattedData = {
        //         src: srcFile.filename,
        //         tests: testsFile.filename,
        //         jwt_token: token
        //     };
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Request-Method': 'POST',
        //         'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
        //     }

        //     axios.post(UPLOAD_URL, files = formattedData, headers)
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })

        // axios.get(UPLOAD_URL, { crossdomain: true })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     })
        //     return 'dung ui!';
        // } else {
        //     const err = new Error('du ma may');
        //     throw err;
        // }
    }
}

export default LearnService;
