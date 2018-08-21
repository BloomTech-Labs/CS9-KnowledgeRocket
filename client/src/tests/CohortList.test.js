import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import { BrowserRouter, Route } from 'react-router-dom';
// Component
import CohortList from '../components/CohortList/CohortList';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = createStore(reducer);

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
		const component = shallow(<CohortList store={mockStore} />);
		const state = component.state('cohort');

		expect(state).toBe(undefined);
	});

	it('should render an Add a new class btn when state is empty', () => {});

	it('should render rocket cards when stateful', () => {});

	it('calls componentDidMount', () => {});

	it('calls fetchData to update state', () => {});
});
