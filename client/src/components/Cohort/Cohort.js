import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { generateBreadCrumbs, addCohort, addStudent } from '../../actions';

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
    state = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
    };

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCheckBox = e => {
        this.setState({ [e.target.name]: !e.target.checked });
    };

    handleAddCohort = () => {
        const cohort = {
            title: this.state.title,
        };
        this.props.addCohort(cohort, this.props.state.user._id);
    };

    handleAddStudent = () => {
        const { firstName, lastName, email } = this.state;
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.location.state;
        const student = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };
        this.props.addStudent(student, teacherID, cohortID);
    };

    render() {
        return [
            <CohortFormMainContainer>
                <StyledCohortSettingForm handleNewInput={this.handleNewInput} />
                <StyledCohortAddStudentForm
                    handleNewInput={this.handleNewInput}
                    handleCheckBox={this.handleCheckBox}
                    handleAddStudent={this.handleAddStudent}
                    ccStatus={this.state.ccEmail}
                />
                <StyledCohortStudentList />
                <StyledCohortRocketList />
                <Button onClick={this.handleAddCohort}>Add this Cohort</Button>
            </CohortFormMainContainer>,
        ];
    }
}

export default connect(mapStateToProps, { generateBreadCrumbs, addCohort, addStudent })(Cohort);
