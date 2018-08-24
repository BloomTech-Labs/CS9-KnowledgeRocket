import React from 'react';
import renderer from 'react-test-renderer';

export const renderSnapshotTest = Component => {
    it('renders correctly', () => {
        const tree = renderer.create(<Component />).toJSON();
        expect(tree).toMatchSnapshot();
    });
};
