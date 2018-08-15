import React from "react";
import { InfoCard } from "./InfoCard";
import Enzyme,{ shallow } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() });

describe('<InfoCard />', ()=>{
    it('renders', () => {
        const wrapper = shallow(<InfoCard />)
        expect(wrapper.find('div').length).toBe(1)
    })
})