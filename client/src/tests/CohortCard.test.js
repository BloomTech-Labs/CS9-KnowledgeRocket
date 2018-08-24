import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter, Route } from 'react-router-dom';
// Component
import CohortCard from '../components/CohortCard/CohortCard';

describe('CohortCard', () => {
	const cohort = {
		cc: false,
		students: ['jane', 'john', 'mark'],
		_id: '123',
		title: 'Calculus 101',
		teacher: 'Bob',
		rockets: [{ _id: '1111' }],
		__v: 1,
	};

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<BrowserRouter>
					<CohortCard cohort={cohort} />
				</BrowserRouter>
			)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
