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
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
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
        this.props.history.push('/rocket/classes');
    };

    render() {
        console.log(this.props);
        return [
            <CohortFormMainContainer>
                <StyledCohortSettingForm handleNewInput={this.handleNewInput} />
                <StyledCohortAddStudentForm
                    handleNewInput={this.handleNewInput}
                    handleCheckBox={this.handleCheckBox}
                    handleAddStudent={this.handleAddStudent}
                    ccStatus={this.state.ccEmail}
                />

                {this.props.location.state ? (
                    <div>
                        <StyledCohortStudentList students={this.props.location.state.students} />
                        <CohortRocketList
                            handlePickRocket={this.handlePickRocket}
                            cohortID={this.props.location.state.cohortID}
                        />
                    </div>
                ) : (
                    <h3>Looks like you don't have any students</h3>
                )}

                <Button onClick={this.handleAddCohort}>Add this Cohort</Button>
            </CohortFormMainContainer>,
        ];
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
