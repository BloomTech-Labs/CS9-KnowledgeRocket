import { ADD_COHORT, ADDING_COHORT, ADD_COHORT_FAILURE } from '../actions';

const defaultState = {
	title: '',
	teacher: '',
	cc: false,
	rockets: [],
	status: '',
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case ADDING_COHORT:
			return Object.assign({}, state, {
				status: ADDING_COHORT,
			});
		case ADD_COHORT:
			return Object.assign({}, state, {
				rockets: [...state.rockets, action.payload],
				status: ADD_COHORT,
			});
		case ADD_COHORT_FAILURE:
			return Object.assign({}, state, {
				status: ADD_COHORT_FAILURE,
			});
		default:
			return state;
	}
};
