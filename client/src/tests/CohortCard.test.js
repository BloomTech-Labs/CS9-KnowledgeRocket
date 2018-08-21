import React from 'react';
import renderer from 'react-test-renderer';
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
		const tree = renderer.create(<CohortCard cohort={cohort} />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
