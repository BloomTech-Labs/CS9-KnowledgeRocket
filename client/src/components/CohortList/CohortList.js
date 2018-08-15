import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        state
    };
}

class CohortList extends Component {
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
            <div>
                
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(CohortList);