import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
// Component
import RForm from '../components/Rocket/RocketForm';

describe('RocketForm', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<RForm />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
