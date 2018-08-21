import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../reducers';
import { BrowserRouter, Route } from 'react-router-dom';
// Component
import CohortList from '../components/CohortList/CohortList';
import AddButtonCard from '../components/CohortList/CohortList';

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
		const state = component.state();

		expect(state).toBeInstanceOf(Object);
		expect(state.cohort).toBeInstanceOf(Array);
		expect(state.cohort.length).toBe(0);
	});

	it('should render an Add a new class btn when state is empty', () => {
		// const component = mount(<CohortList store={mockStore} />);
		// console.log(component);
	});

	it('should render rocket cards when stateful', () => {});

	it('calls componentDidMount', () => {});

	it('calls fetchData to update state', () => {});
});
