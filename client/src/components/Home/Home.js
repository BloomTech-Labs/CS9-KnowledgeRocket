import React, { Component } from 'react';
import './index.css';
import mainImg from '../../assets/HomeBanner.svg'

export default class Home extends Component {
    render() {
        return (
            <div> {/*container*/}
                <div class='HomeBanner'> {/* Top */}
                <div class='Home_ButtonDiv'>
                    <button class='Home_Button'>Sign Up</button>
                    <button class='Home_Button'>Sign In</button>
                </div>
                <img src={mainImg} alt='banner img' class='Home_Banner'></img>
                </div> {/* Top End */}
                <div class='Home_Content'> {/* Main Content*/}
                    <h1>What is a Knowledge Rocket?</h1>
                </div> {/* Main Content End */}
                <div class='Home_Bottom'> {/* Bottom */}
                    <footer>
                        {/* format holding text*/}
                    </footer>
                </div> {/* Bottom End */}
            </div> /*container end*/
        );
    }
}