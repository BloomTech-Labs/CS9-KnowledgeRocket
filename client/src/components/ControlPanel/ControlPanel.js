import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ControlPanel.css'; 

function mapStateToProps(state) {
    return {

    };
}

class ControlPanel extends Component {
    render() {
        return (
            <div className='box4cp'>
                <a className="bobsize" href="">Rockets</a>
                <a className="bobsize" href="">Classes</a>
                <a className="bobsize" href="">Billing</a>
                <a className="bobsize" href="">Settings</a>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ControlPanel);