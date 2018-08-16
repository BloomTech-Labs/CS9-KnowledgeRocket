import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { InfoCard } from "./InfoCard";
import "./index.css";

export default class Home extends Component {
  handleAuthRedirect = e => {
    this.props.history.push("/rocket/auth");
  };
  render() {
    return (
      <div>
        {/*container*/}
        <div className="Home_Banner">
          {/* Top */}
          <div className="Home_ButtonDiv">
            <Button
              className="Home_Button"
              color="primary"
              onClick={this.handleAuthRedirect}
            >
              Sign Up
            </Button>
            <Button
              className="Home_Button"
              color="primary"
              onClick={this.handleAuthRedirect}
            >
              Sign In
            </Button>
          </div>
        </div>
        {/* Top End */}
        <div className="Home_Content">
          {/* Main Content*/}
          <InfoCard
            content={"lorem ipsum"}
            title="lorem ipsum"
            to="/lorem"
            toText="to Lorem"
            img="/path/to/img"
          />
        </div>
        {/* Main Content End */}
        <div className="Home_Bottom">
          {/* Bottom */}
          <footer>{/* format holding text*/}</footer>
        </div>
        {/* Bottom End */}
      </div> /*container end*/
    );
  }
}
