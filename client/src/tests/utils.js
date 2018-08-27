import React from 'react';
import renderer from 'react-test-renderer';

export const renderSnapshotTest = (Component, props) => {
    it('renders correctly', () => {
        const tree = renderer.create(<Component {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
};
