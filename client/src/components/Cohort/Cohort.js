import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs } from '../../actions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortSettingForm from '../CohortSettingForm/CohortSettingForm';

function mapStateToProps(state) {
    return {
        state,
    };
}

const CohortFormMainContainer = styled(Card)`
    margin-left: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    width: 100%;
`;

class Cohort extends Component {
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        // if (!this.props.state.user.authenticated) {
        //     this.props.history.push('/rocket/auth');
        // }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }
    render() {
        return (
            <CohortFormMainContainer>
                <CohortSettingForm />
            </CohortFormMainContainer>
        );
    }
}

export default withRouter(connect(mapStateToProps, { generateBreadCrumbs })(Cohort));
