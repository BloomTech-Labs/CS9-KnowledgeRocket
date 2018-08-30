import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import Button from '@material-ui/core/Button';
// Components
import CohortSettingForm from '../CohortSettingForm/CohortSettingForm';
import CohortAddStudentsForm from '../CohortAddStudentsForm/CohortAddStudentsForm';
import CohortStudentList from '../CohortStudentList/CohortStudentList';
// import CohortRocketList from '../CohortRocketList/CohortRocketList';
// Actions
import { generateBreadCrumbs, addCohort, appendRocket } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledHeaders = styled.h2`
    align-self: flex-start;
    font-size 2rem;
    margin-bottom: 1.5rem;
    font-family: 'Roboto', serif;
`;

const CohortFormMainContainer = styled.div`
    padding: 1rem 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    min-height: 60rem;
`;

const StyledCohortSettingForm = styled(CohortSettingForm)`
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
    background-color: white;
    border-radius: 0.4rem;
    box-shadow: var(--grayRedBlue_shadow);
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

// const StyledCohortRocketList = styled(CohortRocketList)`
//     display: flex;
//     flex-direction: row;
//     flex-wrap: wrap;
//     justify-content: space-around;
//     align-items: center;
//     width: 100%;
//     padding: 1rem;
//     margin-bottom: 2rem;
// `;

const StyledAddCohortBtn = styled(Button)`
    width: 10rem;
`;

class Cohort extends Component {
    state = {
        title: '',
        startDate: {
            /* objectID : date*/
            objectID: 0,
        },
        cohort: {
            cc: false,
            rockets: { _id: '', rocketId: '', startDate: '', td: '', tw: '', tm: '' },
            students: [{}],
            title: '',
            _id: '',
        },
        cohortIDX: 0,
    };

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        let cohortIDX;
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs('/rocket/classes');
        let cohort = {};
        this.props.state.user.cohorts.forEach((ch, index) => {
            if (ch._id === this.props.match.params.id) {
                cohort = ch;
                cohortIDX = index;
            }
        });
        this.setState({
            startDate: { objectID: Date.now() },
            cohort,
            cohortIDX: cohortIDX,
        });
    }

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCheckBox = e => {
        console.log('MADE IT TO handleCheckBox');
        this.setState({ [e.target.name]: !!e.target.checked });
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
            this.props.match.params.id
        );
        //rocketID, startDate, userID, cohortID
    };

    handlePickRocket = rocketID => {
        const today = new Date(new Date().setHours(0, 0, 0, 0));
        // console.log(today.toDateString())
        this.handleAppendRocket(rocketID, Date.parse(today));
    };
    handleAddStudent = () => {
        const { firstName, lastName, email } = this.state;
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.match.params.id;
        const student = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        this.props.addStudent(student, teacherID, cohortID);
    };

    render() {
        console.log(`COHORT PROPS ${JSON.stringify(this.props)}`);
        const cohortID = this.props.match.params.id;
        console.log(`COHORTID ${JSON.stringify(this.props.match)}, ${cohortID}`);

        return (
            <CohortFormMainContainer>
                <StyledHeaders>Class Settings</StyledHeaders>
                <StyledCohortSettingForm
                    handleNewInput={this.handleNewInput}
                    handleCheckBox={this.handleCheckBox}
                    cohortID={cohortID}
                />
                <StyledHeaders>Add Students</StyledHeaders>
                <StyledCohortAddStudentForm cohortID={this.props.match.params.id} />
                <StyledHeaders>Students</StyledHeaders>
                {this.state.cohort.students.length > 0 ? (
                    <StyledCohortStudentList
                        students={this.state.cohort.students}
                        match={this.props.match}
                        cohortID={this.state.cohortIDX}
                    />
                ) : (
                    <h3>Looks like you don't have any students</h3>
                )}
                <StyledHeaders>Knowledge Rockets</StyledHeaders>

                {/* <StyledCohortRocketList
                    handlePickRocket={this.handlePickRocket}
                    cohortID={this.props.match.params.id}
                /> */}

                <StyledAddCohortBtn
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddCohort}
                >
                    Add this Cohort
                </StyledAddCohortBtn>
            </CohortFormMainContainer>
        );
    }
}

export default connect(mapStateToProps, {
    generateBreadCrumbs,
    addCohort,
    appendRocket,
})(Cohort);
