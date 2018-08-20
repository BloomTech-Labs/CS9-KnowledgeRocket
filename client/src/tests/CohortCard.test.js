import React from 'react';
import renderer from 'react-test-renderer';
// Component
import CohortCard from '../components/CohortCard/CohortCard';

describe('CohortCard', () => {
	it('renders correctly', () => {
		const tree = renderer.create(<CohortCard />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
