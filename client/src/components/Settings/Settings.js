import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

class Settings extends Component {
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }
    render() {
        return <div className="Main_container">SETTINGS PLACEHOLDER</div>;
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(Settings);
