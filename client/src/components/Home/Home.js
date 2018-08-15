import React, { Component } from 'react';
import './index.css';

export default class Home extends Component {
    handleAuthRedirect = (e) => {
        this.props.history.push('/rocket/auth');
    }
    render() {
        return (
            <div> {/*container*/}
                <div className='Home_Banner'> {/* Top */}
                    <div className='Home_Button-Div'>
                        <button className='Home_Button' onClick={this.handleAuthRedirect}>Sign Up</button>
                        <button className='Home_Button' onClick={this.handleAuthRedirect}>Sign In</button>
                    </div>
                </div> {/* Top End */}
                <div className='Home_Content'> {/* Main Content*/}
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