import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// Styles
import './CohortList.css';

function mapStateToProps(state) {
    return {
        state,
    };
}

// RENDERS A LIST OF COHORT CARDS
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
            <div className="CohortListContainer">
                <Card className="CohortCard">
                    <CardContent>THIS IS A COHORT</CardContent>
                </Card>
                <Card className="CohortCard">
                    <CardContent>THIS IS A COHORT</CardContent>
                </Card>
                <Card className="CohortCard">
                    <CardContent>THIS IS A COHORT</CardContent>
                </Card>
                <Card className="CohortCard">
                    <CardContent>THIS IS A COHORT</CardContent>
                </Card>
                <Card className="AddButtonCard">
                    <CardContent>Add A NEW COHORT</CardContent>
                </Card>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CohortList);
