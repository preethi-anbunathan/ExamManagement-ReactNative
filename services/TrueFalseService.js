let _singleton;
const TRUEFALSE_API_URL = 'http://10.0.3.2:8080/api/exam/EID/truefalse';
const TRUEFALSE_DEL_API_URL = 'http://10.0.3.2:8080/api/truefalse/';
const TRUEFALSE_UPT_API_URL = 'http://10.0.3.2:8080/api/truefalse/';
class TrueFalseService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }


    createTrueFalse(truefalse,examId) {
        return fetch(TRUEFALSE_API_URL.replace('EID',examId), {
            body: JSON.stringify(truefalse),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            return response.json();
        })
    }


    deleteTrueFalse(qid) {
        return fetch(TRUEFALSE_DEL_API_URL+qid, {
            method: 'DELETE'
        }).then(function (response) {
            return response;
        })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new TrueFalseService(_singleton);
        return this[_singleton]
    }
}
export default TrueFalseService