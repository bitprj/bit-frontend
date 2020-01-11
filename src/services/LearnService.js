import axios from 'axios';

import { API_URL, UPLOAD_URL } from './API_URLs';

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
        const hints = data.map(hint => {
            const children = hint.hint_children.map(child => {
                return {
                    dbID: child.hint.id,
                    id: child.hint.contentful_id,
                    isLocked: child.is_locked
                }
            })
            return {
                dbID: hint.hint.id,
                id: hint.hint.contentful_id,
                isLocked: hint.is_locked,
                children: children
            }
        });

        return hints;
    }

    async uploadFiles(fileItems) {
        let srcFile = null;
        let testsFile = null;
        let token = localStorage.getItem('token');

        fileItems.forEach(fileItem => {
            if (fileItem.filename === 'src.zip') {
                srcFile = fileItem.file;
            } else if (fileItem.filename === 'tests.zip') {
                testsFile = fileItem.file;
            }
        })

        if (srcFile && testsFile) {
            const headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Request-Method': 'POST',
                'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
            }

            let formData = new FormData();
            formData.append('src', srcFile);
            formData.append('tests', testsFile);
            formData.append('jwt_token', token);
            formData.append('checkpoint_id', 12)

            axios.post(UPLOAD_URL, formData, { headers })
                .then(response => console.log(response))
                .catch(err => {
                    console.log(err);
                });
            return 'dung ui!';

            // let request = new XMLHttpRequest();
            // request.open('POST', UPLOAD_URL);
            // request.send(formData);

            // request.onreadystatechange = function () {
            //     if (request.readyState === XMLHttpRequest.DONE) {
            //         console.log(request.responseText);
            //     }
            // }
        } else {
            const err = new Error('du ma may');
            throw err;
        }
    }
}

export default LearnService;
