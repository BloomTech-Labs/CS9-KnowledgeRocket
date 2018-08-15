import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Cohort.css';

function mapStateToProps(state) {
    return {
        state
    };
}

class Cohort extends Component {
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
    }
    render() {
        return (
            <div className='Main_container'>
                COHORT PLACEHOLDER
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Cohort);