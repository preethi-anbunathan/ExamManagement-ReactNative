const ASSIGN_API_URL =
    //'http://10.0.3.2:8080/api/lesson/LID/exam';
    'http://10.0.3.2:8080/api/lesson/LID/assignment';
const ASSIGN_DEL_API_URL =
    'http://10.0.3.2:8080/api/assignment/AID';

let _singleton;
export default class AssignmentService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    createAssign(lessonId, assignment) {
        return fetch(ASSIGN_API_URL.replace('LID', lessonId),
            { body: JSON.stringify(assignment),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        {
            return response.json(); })
    }

    deleteAssign(assignId) {
        return fetch(ASSIGN_DEL_API_URL.replace
        ('AID', assignId), {
            method: 'delete'
        }).then(function (response) {
            return response;
        })
    }

    findAllAssignForLesson(lessonId) {
        return fetch(
            ASSIGN_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new AssignmentService(_singleton);
        return this[_singleton]
    }
}