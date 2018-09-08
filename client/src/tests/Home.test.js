import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../components/Home/Home';
import {
    HomeContainer,
    HomeCTA,
    HomeNav,
    NavLogo,
    NavButton,
    HomeHeader,
    MidSection,
    MidSectionWrapper,
    MidColumn,
    MidContainer,
    MidHeader,
    MidImg,
    MidSectionText,
    FooterSection,
} from '../components/Home/HomeStyled';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
    const wrapper = shallow(<Home />);

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Home />, div);
    });

    describe('HomeContainer', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<HomeContainer />, div);
        });

        it('renders a Get Started button', () => {
            expect(
                wrapper
                    .find(NavButton)
                    .at(0)
                    .render()
                    .text()
            ).toBe('Get Started');
        });

        it('Displays What is a Knowledge Rocket?', () => {
            expect(
                wrapper
                    .find(HomeHeader)
                    .at(0)
                    .render()
                    .text()
            ).toBe('What is a Knowledge Rocket?');
        });

        it('Displays Implementation Text on Column', () => {
            expect(
                wrapper
                    .find(MidHeader)
                    .at(0)
                    .render()
                    .text()
            ).toBe('Implementation');
        });

        it('Displays Practice Text on Column', () => {
            expect(
                wrapper
                    .find(MidHeader)
                    .at(1)
                    .render()
                    .text()
            ).toBe('Practice');
        });

        it('Displays Results Text on Column', () => {
            expect(
                wrapper
                    .find(MidHeader)
                    .at(2)
                    .render()
                    .text()
            ).toBe('Results');
        });
    });

    describe('HomeCTA', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<HomeCTA />, div);
        });
    });

    describe('NavLogo', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<NavLogo />, div);
        });
    });

    describe('HomeNav', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<HomeNav />, div);
        });
    });

    describe('HomeHeader', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<HomeHeader />, div);
        });
    });

    describe('MidSection', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidSection />, div);
        });
    });

    describe('MidSectionWrapper', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidSectionWrapper />, div);
        });
    });

    describe('MidColumn', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidColumn />, div);
        });
    });

    describe('MidContainer', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidContainer />, div);
        });
    });

    describe('MidHeader', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidHeader />, div);
        });
    });

    describe('MidSectionText', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MidSectionText />, div);
        });
    });

    describe('FooterSection', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<FooterSection />, div);
        });
    });
});
