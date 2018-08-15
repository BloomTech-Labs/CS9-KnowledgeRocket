import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// Components
import App from "../App";
import Routes from "../components/Routes";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
	const wrapper = shallow(<App />);
	const instance = wrapper.instance();

	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<App />, div);
	});

	it("should render a <Routes /> component", () => {
		expect(wrapper.find(Routes));
	});
});
