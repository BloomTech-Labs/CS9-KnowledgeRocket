import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
// Actions
import { generateBreadCrumbs, addCohort, addStudent, appendRocket } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedInput = styled(Input)`
    padding: 0.5rem;
    flex-grow: 3;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    margin: 0rem 1rem 1rem 0rem;
    @media (max-width: 500px) {
        margin: 0rem 0rem 1rem 0rem;
    }
`;

const StyledCohortSettingForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 1rem 0rem 1rem;
    width: 100%;
    background-color: white;
    border-radius: 0.4rem;
    box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    @media (max-width: 500px) {
        flex-direction: column;
    }
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
    align-items: space-between;
    justify-content: flex-start;
    width: 100%;
    min-height: 100vh;
`;

const StyledButton = styled(Button)`
    flex-grow: 0;
    padding: 0.5rem;
    margin: 0rem 0rem 1rem 0rem !important;
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
        open: false,
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
        return [
            <CohortFormMainContainer>
                <StyledHeaders>Create a new Class</StyledHeaders>
                <StyledCohortSettingForm>
                    <StylizedInput
                        placeholder="Please Enter a Name for your New Class"
                        disableUnderline={true}
                        name="title"
                        onChange={this.handleNewInput}
                        autoComplete="off"
                    />
                    <StyledButton
                        variant="contained"
                        color="primary"
                        onClick={this.handleAddCohort}
                    >
                        Add this Class
                    </StyledButton>
                </StyledCohortSettingForm>
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
)(CohortAdd);
