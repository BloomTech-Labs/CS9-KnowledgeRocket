import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducer from '../reducers';
import { BrowserRouter, Route } from 'react-router-dom';
// Component
import CohortList from '../components/CohortList/CohortList';

const mockStore = createStore(reducer);

describe('CohortList', () => {
	it('renders correctly', () => {
		const tree = renderer.create(
			<Provider store={mockStore}>
				<BrowserRouter>
					<Route to='/' component={CohortList} />
				</BrowserRouter>
			</Provider>).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
