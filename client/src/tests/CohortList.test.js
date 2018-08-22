import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
// Action
import { generateBreadCrumbs } from '../actions';
// Component
import CohortList from '../components/CohortList/CohortList';
import { CohortList as UnWrapped } from '../components/CohortList/CohortList';
import AddButtonCard from '../components/CohortList/CohortList';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = createStore(reducer);

const mockUser = {
	user: {
		account: 'free',
		authProvider: 'email',
		authenticated: true,
		cohorts: [],
		email: 'teacher33@gmail.com',
		uid: 'DpPGHzgGKoe5tkFbVoorkdipRdv2',
	},
};

const mockHistory = {
	location: {
		pathname: '/rocket/classes',
	},
};

const mockAxios = {
	get: jest.fn(() => Promise.resolve({ data: {} })),
};

describe('CohortList', () => {
	const tree = renderer
		.create(
			<Provider store={mockStore}>
				<BrowserRouter>
					<Route to="/" component={CohortList} />
				</BrowserRouter>
			</Provider>
		)
		.toJSON();

	it('renders correctly', () => {
		expect(tree).toMatchSnapshot();
	});

	it('should have initial state', () => {
		const component = mount(
			<UnWrapped
				state={mockUser}
				history={mockHistory}
				store={mockStore}
				generateBreadCrumbs={generateBreadCrumbs}
			/>
		);

		expect(component.instance().state.cohort).toBeInstanceOf(Array);
		expect(component.instance().state.cohort.length).toBe(0);
	});

	it('calls componentDidMount', () => {
		const spy = jest.spyOn(UnWrapped.prototype, 'componentDidMount');
		const component = mount(
			<UnWrapped
				state={mockUser}
				history={mockHistory}
				store={mockStore}
				generateBreadCrumbs={generateBreadCrumbs}
			/>
		);

		expect(spy).toHaveBeenCalled();
	});

	it('has a fetchCohortData function', () => {
		const component = mount(
			<UnWrapped
				state={mockUser}
				history={mockHistory}
				store={mockStore}
				generateBreadCrumbs={generateBreadCrumbs}
			/>
		);

		expect(component.instance().fetchCohortData).toBeInstanceOf(Function);
	});

	// it('calls fetchCohortData to update state', () => {
	// 	const component = mount(
	// 		<UnWrapped
	// 			state={mockUser}
	// 			history={mockHistory}
	// 			store={mockStore}
	// 			generateBreadCrumbs={generateBreadCrumbs}
	// 		/>
	// 	);

	// 	const spy = jest.spyOn(UnWrapped.prototype, 'fetchCohortData');

	// 	expect(spy).toHaveBeenCalledOnce()

	// });
});
