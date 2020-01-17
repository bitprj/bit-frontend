import { backend, grader } from './AxiosInstances';

class LearnService {
    async getHintStatus(labID, cardID) {
        const endpoint = `/lab/${labID}/card/${cardID}/fetch`;
        return backend.get(endpoint);
    }

    processHintStatus(rawData) {
        const hints = rawData.map(hint => {
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
                .then(response => response.data)
                .catch(err => {
                    console.log(err);
                });
        } else {
            const err = new Error('Invalid Files - Submit exactly one src.zip and one tests.zip file.');
            throw err;
        }
    }

    processResult(rawData) {
        // console.log('raw', rawData);
        // const result = rawData;

        const passCases = rawData.pass_cases.map(pass => {
            return pass;
        });
        const result = {
            submission: rawData.submission,
            passCases: passCases,
            failCase: rawData.fail_case,
            numFail: rawData.num_fail,
            numPass: rawData.num_pass
        }

        return result;
    }
}

export default LearnService;
