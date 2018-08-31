import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import Input from '@material-ui/core/Input';
// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
// Components
import { generateBreadCrumbs, addCohort, addStudent, appendRocket } from '../../actions';

const StylizedInput = styled(Input)`
    padding: 0.5rem;
    width: 80%;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    margin-right: 1rem;
`;
// Actions

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledCohortSettingForm = styled.div`
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

const StyledHeaders = styled.h2`
    align-self: flex-start;
    font-size 2rem;
    margin-bottom: 1.5rem;
    font-family: 'Roboto', serif;
`;

const CohortFormMainContainer = styled.div`
    padding: 1rem 1rem 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
`;

class CohortAdd extends Component {
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

    handleAddCohort = () => {
        const cohort = {
            title: this.state.title,
        };
        this.props.addCohort(cohort, this.props.state.user._id);
        this.props.history.push('/rocket/classes');
    };

    render() {
        console.log('MADE IT TO COHORTADD');
        return (
            <CohortFormMainContainer>
                <StyledHeaders>Create a new Cohort</StyledHeaders>
                <StyledCohortSettingForm>
                    <StylizedInput
                        placeholder="Please Enter a Name for your New Class"
                        disableUnderline={true}
                        name="title"
                        onChange={this.handleNewInput}
                    />
                    <Button variant="contained" color="primary" onClick={this.handleAddCohort}>
                        Add this Cohort
                    </Button>
                </StyledCohortSettingForm>
            </CohortFormMainContainer>
        );
    }
}

export default connect(mapStateToProps, {
    generateBreadCrumbs,
    addCohort,
    addStudent,
    appendRocket,
})(CohortAdd);
