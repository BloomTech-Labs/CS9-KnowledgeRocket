import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
// Actions
import { addCohort } from '../../actions';

function mapStateToProps(state) {
	return {
		state,
	};
}

const StylizedInput = styled(Input)`
	padding: 5px;
`;

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortAddStudentsForm extends Component {
	state = {
		disabled: true,
		firstName: '',
		lastName: '',
		email: '',
		cc: '',
	};

	handleNewInput = e => {
		this.setState({ [e.target.name]: e.target.value });
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
		return (
			<Card className={this.props.className}>
				<StylizedInput
					placeholder="Last Name"
					disableUnderline={true}
					name="lastName"
					onChange={this.handleNewInput}
					required={true}
				/>
				<StylizedInput
					placeholder="First Name"
					disableUnderline={true}
					name="firstName"
					onChange={this.handleNewInput}
					required={true}
				/>
				<StylizedInput
					placeholder="Email"
					disableUnderline={true}
					name="email"
					onChange={this.handleNewInput}
					type="email"
					required={true}
					pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])"
				/>
				<Button
					variant="contained"
					color="primary"
					disabled={this.state.disabled}
					onClick={this.handleAddStudent}
				>
					Add
				</Button>
			</Card>
		);
	}
}

export default connect(mapStateToProps, {
	addCohort,
})(CohortAddStudentsForm);
