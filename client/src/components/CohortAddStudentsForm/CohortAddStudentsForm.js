import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
// Actions
import { addStudent } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedInput2 = styled.input`
    background-color: #f2f7ff;
    color: black;
    border-radius: 0.25rem;
    border: 0;
    margin-right: 0.5rem;
    padding: 0.9rem 0.5rem;
    font-size: 1rem;
    outline: none;
    &::placeholder {
        color: #9a9da2;
    }
    @media (max-width: 800px) {
        width: 100%;
    }
`;

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortAddStudentsForm extends Component {
    constructor() {
        super();
        this.state = {
            disabled: true,
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleAddStudent = () => {
        const { firstName, lastName, email } = this.state;
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.cohortID;
        const student = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        this.props.addStudent(student, teacherID, cohortID);
    };

    handleValidateInput = () => {
        const { firstName, lastName, email } = this.state;
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

        if (firstName.length > 0 && lastName.length > 0 && email.length > 0) {
            if (regex.test(email)) {
                this.setState({ disabled: false });
            } else {
                this.setState({ disabled: true });
            }
        } else {
            this.setState({ disabled: true });
        }
    };

    handleOnChange = e => {
        this.handleValidateInput();
        this.handleNewInput(e);
    };

    handleOnClick = () => {
        this.handleAddStudent();
        this.props.actionClick();
        this.props.expand(true);
        this.setState({
            disabled: true,
            firstName: '',
            lastName: '',
            email: '',
        });
        document.getElementById('lastNameField').focus();
    };

    handleEnter = e => {
        if (e.keyCode === 13) {
            this.handleOnClick();
        }
    };

    render() {
        return (
            <Card className={this.props.className}>
                <StylizedInput2
                    id="lastNameField"
                    placeholder="Last Name"
                    disableUnderline={true}
                    name="lastName"
                    onChange={this.handleOnChange}
                    required={true}
                    value={this.state.lastName}
                />
                <StylizedInput2
                    placeholder="First Name"
                    disableUnderline={true}
                    name="firstName"
                    onChange={this.handleOnChange}
                    required={true}
                    value={this.state.firstName}
                />
                <StylizedInput2
                    className="emailInput"
                    id="emailInputField"
                    key="emailInputField"
                    disableUnderline={true}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleOnChange}
                    onKeyDown={this.handleEnter}
                    value={this.state.email}
                    type="email"
                    required={true}
                />
                <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.disabled}
                    onClick={this.handleOnClick}
                >
                    Add
                </Button>
            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        addStudent,
    }
)(CohortAddStudentsForm);
