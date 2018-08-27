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

const StyledAddCohortBtn = styled(Button)`
    width: 95%;
`;

class Cohort extends Component {
    state = {
        title: '',
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

    render() {
        console.log(`COHORT ID ${this.props.location.state.cohortID}`);
        console.log(`COHORT PROPS ${JSON.stringify(this.props)}`);
        const { cohortID } = this.props.location.state;
        const { students } = this.props.location.state;

        return (
            <CohortFormMainContainer>
                <StyledHeaders>Class Settings</StyledHeaders>
                <StyledCohortSettingForm handleNewInput={this.handleNewInput} />
                <StyledHeaders>Add Students</StyledHeaders>
                <StyledCohortAddStudentForm cohortID={cohortID} />
                <StyledHeaders>Students</StyledHeaders>
                {this.props.location.state ? (
                    <StyledCohortStudentList students={students} />
                ) : (
                    <h3>Looks like you don't have any students</h3>
                )}
                <StyledHeaders>Knowledge Rockets</StyledHeaders>
                <StyledCohortRocketList
                    handlePickRocket={this.handlePickRocket}
                    cohortID={this.props.match.params.id}
                />

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
