import React, { Component } from 'react';
// import axios from 'axios';

function mapStateToProps(state) {
    return {
        state,
    };
}
class RocketResult extends Component {
    render() {
        return <div />;
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(RocketResult);
