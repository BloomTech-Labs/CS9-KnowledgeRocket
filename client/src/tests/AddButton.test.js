import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import AddButton from "../components/AddButton/AddButton.js";

Enzyme.configure({ adapter: new Adapter() });

describe("<AddButton />", () => {
	const wrapper = shallow(<AddButton />);
	const instance = wrapper.instance();

	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<AddButton />, div);
	});
});
