import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {

    };
}

class NavBar extends Component {
    render() {
        return (
            <div>
                NAV BAR
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(NavBar);