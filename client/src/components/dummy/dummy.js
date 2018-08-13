import React, { Component } from 'react';
import logo from './logo.svg';
import './dummy.css';

class Dummy extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to Knowledge Rocket</h1>
                </header>
                <p className="App-intro">
                    Let's Begin adding some features!
        </p>
                <ul>
                    <p>This App is Wrapped With:</p>
                    <li>1. Browser Router</li>
                    <li>2. React-Redux</li>
                    <li>3. Redux-Boilerplate</li>
                    <li>4. Redux-Promise</li>
                    <li>5. Axios</li>
                </ul>
            </div>
        );
    }
}

export default Dummy;
