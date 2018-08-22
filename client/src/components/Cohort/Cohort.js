import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// Components
import CohortSettingForm from '../CohortSettingForm/CohortSettingForm';
import CohortAddStudentsForm from '../CohortAddStudentsForm/CohortAddStudentsForm';
import CohortStudentList from '../CohortStudentList/CohortStudentList';
import CohortRocketList from '../CohortRocketList/CohortRocketList';
// Actions
import { generateBreadCrumbs, addCohort } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const CohortFormMainContainer = styled(Card)`
    margin-left: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
`;

const StyledCohortSettingForm = styled(CohortSettingForm)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
`;

const StyledCohortAddStudentForm = styled(CohortAddStudentsForm)`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 95%;
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
`;

const StyledCohortStudentList = styled(CohortStudentList)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 95%;
    padding: 20px;
`;

const StyledCohortRocketList = styled(CohortRocketList)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    width: 95%;
    height: 800px;
    padding: 20px;
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

    handleAddCohort = () => {
        const cohort = {
            title: 'CS101',
            teacher: 'SERGAY',
            cc: false,
            rockets: [],
            status: '',
        };
        this.props.addCohort(cohort);
    };

    render() {
        return [
            <CohortFormMainContainer>
                <StyledCohortSettingForm />
                <StyledCohortAddStudentForm />
                <StyledCohortStudentList />
                <StyledCohortRocketList />
                <Button onClick={this.handleAddCohort}>Add this Cohort</Button>
            </CohortFormMainContainer>,
        ];
    }
}

export default withRouter(connect(mapStateToProps, { generateBreadCrumbs, addCohort })(Cohort));
