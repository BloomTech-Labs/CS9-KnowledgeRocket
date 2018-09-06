import { FETCHING_RESPONSE, RESPONSE_RECEIVED, FETCHING_RESPONSE_FAILED } from '../actions';

const defaultState = {
    // Initialize Rockets Redux State/Store Portion Here
    status: '',
    responseRockets: {
        twoDay: {
            questionId: '',
            cohortId: '',
            students: [
                {
                    studentId: '',
                    answer: [
                        {
                            choice: 0,
                            submitted: '00/00/0000',
                        },
                    ],
                },
            ],
            sent: 0,
        },
        twoWeek: {
            questionId: '',
            cohortId: '',
            students: [
                {
                    studentId: '',
                    answer: [
                        {
                            choice: 0,
                            submitted: '00/00/0000',
                        },
                    ],
                },
            ],
            sent: 0,
        },
        twoMonth: {
            questionId: '',
            cohortId: '',
            students: [
                {
                    studentId: '',
                    answer: [
                        {
                            choice: 0,
                            submitted: '00/00/0000',
                        },
                    ],
                },
            ],
            sent: 0,
        },
    },
};

export default (state = defaultState, action) => {
    let StateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case FETCHING_RESPONSE:
            StateCopy.status = FETCHING_RESPONSE;
            return StateCopy;
        case RESPONSE_RECEIVED:
            StateCopy.responseRockets = action.payload;
            StateCopy.status = RESPONSE_RECEIVED;
            return StateCopy;
        case FETCHING_RESPONSE_FAILED:
            StateCopy.status = FETCHING_RESPONSE_FAILED;
            return StateCopy;
        default:
            return state;
    }
};
