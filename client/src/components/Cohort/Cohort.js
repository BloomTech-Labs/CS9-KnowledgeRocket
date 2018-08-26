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
import FormLabel from '@material-ui/core/FormLabel';
// Actions
import { generateBreadCrumbs, addCohort, addStudent, appendRocket } from '../../actions';
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
    justify-content: space-between;
    height: 4rem;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
`;

const StyledCohortAddStudentForm = styled(CohortAddStudentsForm)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 4rem;
    padding: 1rem;
    margin-bottom: 20px;
`;

const StyledCohortStudentList = styled(CohortStudentList)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const StyledCohortRocketList = styled(CohortRocketList)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1rem;
`;

const CohortLabel = styled(FormLabel)`
    width: 100%;
    height: 2rem;
    color: black !important;
`;

class Cohort extends Component {
    state = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        startDate: {
            /* objectID : date*/
            objectID: 0,
        },
    };

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs('/rocket/classes');
        this.setState({
            startDate: { objectID: Date.now() },
        });
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
    handleAppendRocket = (rocketID, startDate) => {
        //startDate:
        this.setState({
            startDate: { [rocketID]: startDate },
        });
        this.props.appendRocket(
            rocketID,
            startDate,
            this.props.state.user._id,
            this.props.location.state.cohortID
        );
        //rocketID, startDate, userID, cohortID
    };
    handlePickRocket = rocketID => {
        this.handleAppendRocket(rocketID, Date.now());
    };
    handleAddStudent = () => {
        const { firstName, lastName, email } = this.state;
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.location.state.cohortID;
        const student = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        this.props.addStudent(student, teacherID, cohortID);
    };

    render() {
        console.log(this.props);
        return (
            <CohortFormMainContainer>
                <CohortLabel>Create or Edit the Class Settings</CohortLabel>
                <StyledCohortSettingForm handleNewInput={this.handleNewInput} />
                <CohortLabel>Add New Studdents</CohortLabel>
                <StyledCohortAddStudentForm
                    handleNewInput={this.handleNewInput}
                    handleCheckBox={this.handleCheckBox}
                    handleAddStudent={this.handleAddStudent}
                    ccStatus={this.state.ccEmail}
                />

                <CohortLabel>List of Students</CohortLabel>
                <StyledCohortStudentList
                    students={this.props.location.state.students}
                    cohortID={this.props.match.params.id}
                />

                <CohortLabel>List of Rockets</CohortLabel>
                <StyledCohortRocketList
                    handlePickRocket={this.handlePickRocket}
                    cohortID={this.props.match.params.id}
                />
                <Button onClick={this.handleAddCohort}>Add this Cohort</Button>
            </CohortFormMainContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        generateBreadCrumbs,
        addCohort,
        addStudent,
        appendRocket,
    }
)(Cohort);
