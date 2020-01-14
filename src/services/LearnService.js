import { backend, grader } from './AxiosInstances';

class LearnService {
    async getHintStatus(labID, cardID) {
        const endpoint = `/lab/${labID}/card/${cardID}/fetch`;
        return backend.get(endpoint);
    }

    async processHintStatus(data) {
        const hints = data.map(hint => {
            const children = hint.hint_children.map(child => {
                return {
                    dbID: child.hint.id,
                    id: child.hint.contentful_id,
                    isLocked: !child.is_unlocked
                }
            })
            return {
                dbID: hint.hint.id,
                id: hint.hint.contentful_id,
                isLocked: !hint.is_unlocked,
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
            // const headers = {
            //     'Content-Type': 'multipart/form-data',
            //     'Access-Control-Request-Method': 'POST',
            //     'Access-Control-Request-Headers': 'X-PINGOTHER, Content-Type'
            // }

            let formData = new FormData();
            formData.append('src', srcFile);
            formData.append('tests', testsFile);
            formData.append('jwt_token', token);
            formData.append('checkpoint_id', 12)

            return grader.post('/uploader', formData)
                // return axios.post(UPLOAD_URL, formData)
                .then(response => response.data)
                .catch(err => {
                    console.log(err);
                });
        } else {
            const err = new Error('Invalid Files');
            throw err;
        }
    }
}

export default LearnService;
