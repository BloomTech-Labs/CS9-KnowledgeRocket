import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class ControlPanel extends Component {
    render() {
        return (
            <div>
                <button>One</button>
                <button>Two</button>
                <button>Three</button>
                <button>Four</button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ControlPanel);