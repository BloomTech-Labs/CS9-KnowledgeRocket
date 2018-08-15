import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "../components/Home/Home.js";

Enzyme.configure({ adapter: new Adapter() });

describe("<Home />", () => {
	const wrapper = shallow(<Home />);
	const instance = wrapper.instance();

	it("renders without crashing", () => {
		const div = document.createElement("div");
		ReactDOM.render(<Home />, div);
	});

	describe("Home Banner container", () => {
		it("has a Home_Banner container", () => {
			expect(wrapper.exists(".Home_Banner")).toBe(true);
		});

		it("renders a Sign Up button", () => {
			expect(
				wrapper
					.find(".Home_Button")
					.at(0)
					.render()
					.text()
			).toBe("Sign Up");
		});

		it("renders a Sign In button", () => {
			expect(
				wrapper
					.find(".Home_Button")
					.at(1)
					.render()
					.text()
			).toBe("Sign In");
		});
	});
});
