import React, { Component } from "react";
import "./index.css";
import mainImg from "../../assets/HomeBanner.svg";

export default class Home extends Component {
    handleAuthRedirect = e => {
        this.props.history.push("/rocket/auth");
    };
    render() {
        return (
            <div>
                {" "}
                {/*container*/}
                <div className="Home_Banner">
                    {" "}
                    {/* Top */}
                    <div className="Home_ButtonDiv">
                        <Button
                            className="Home_Button"
                            color="primary"
                            onClick={this.handleAuthRedirect}>
                            Sign Up
                        </Button>
                        <Button
                            className="Home_Button"
                            color="primary"
                            onClick={this.handleAuthRedirect}>
                            Sign In
                        </Button>
                    </div>
                </div>{" "}
                {/* Top End */}
                <div className="Home_Content">
                    {" "}
                    {/* Main Content*/}
                    <h1>What is a Knowledge Rocket?</h1>
                </div>{" "}
                {/* Main Content End */}
                <div class="Home_Bottom">
                    {" "}
                    {/* Bottom */}
                    <footer>{/* format holding text*/}</footer>
                </div>{" "}
                {/* Bottom End */}
            </div> /*container end*/
        );
    }
}
