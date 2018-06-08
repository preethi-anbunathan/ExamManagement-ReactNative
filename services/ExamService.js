const EXAM_API_URL =
    //'http://10.0.3.2:8080/api/lesson/LID/exam';
   'http://10.0.3.2:8080/api/lesson/LID/exam';
const EXAM_DEL_API_URL =
    'http://10.0.3.2:8080/api/exam/EID';

let _singleton;
export default class ExamService {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Singleton!!!');
    }

    createExam(lessonId, exam) {
        return fetch(EXAM_API_URL.replace('LID', lessonId),
            { body: JSON.stringify(exam),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST'
            }).then(function (response)
        { return response.json(); })
    }

    deleteExam(examId) {
        return fetch(EXAM_DEL_API_URL.replace
        ('EID', examId), {
            method: 'delete'
        })
    }

    findAllExamsForLesson(lessonId) {
        return fetch(
            EXAM_API_URL
                .replace('LID', lessonId))
            .then(function (response) {
                return response.json();
            })
    }

    static get instance() {
        if(!this[_singleton])
            this[_singleton] = new ExamService(_singleton);
        return this[_singleton]
    }
}