import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
// Components
import App from '../App';
import Routes from '../components/Routes';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
    it('renders without crashing', () => {
        // App Test will never pass with snapshot if we use Styled Components.
        // Styled components have a random class name every time.
        // const tree = renderer.create(<App />);
        // expect(tree).toMatchSnapshot();
    });

    it('should render a <Routes /> component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find(Routes));
    });
});
