import React from "react";
import { InfoCard, InfoCardContainer } from "./InfoCard";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("<InfoCard />", () => {
  // proptypes will get angry if we try to create
  // a component without the needed props

  // so we create a spy to stop the original warn from happening
  console.error = jest.fn();
  it("renders", () => {
    const wrapper = shallow(<InfoCard />);
    expect(wrapper.find(InfoCardContainer).length).toBeGreaterThan(0);
  });
});
