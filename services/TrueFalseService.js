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
        console.log("In CREATE SERVICE"+truefalse);
        return fetch(TRUEFALSE_API_URL.replace('EID',examId), {
            body: JSON.stringify(truefalse),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            alert("Question created successfully");
            return response.json();
        })
    }

    updateTrueFalse(truefalse,questionId) {
        console.log("In UPDATE SERVICE"+truefalse);

        return fetch(TRUEFALSE_UPT_API_URL+questionId, {
            body: JSON.stringify(truefalse),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        }).then(function (response) {
            alert("Question has been updated!!");
            return response.json();
        })
    }

    deleteTrueFalse(qid) {
        console.log("In delete service");
        console.log("API:"+TRUEFALSE_DEL_API_URL+qid);
        return fetch(TRUEFALSE_DEL_API_URL+qid, {
            method: 'DELETE'
        }).then(function (response) {
            alert("Question has been deleted!!");
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