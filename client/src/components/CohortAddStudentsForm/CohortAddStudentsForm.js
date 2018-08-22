import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const StylizedInput = styled(Input)`
	padding: 5px;
`;

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortAddStudentsForm extends Component {
	render() {
		return (
			<Card className={this.props.className}>
				<StylizedInput
					placeholder="Last Name"
					disableUnderline={true}
					name="studentLastName"
					onChange={this.props.handleNewInput}
				/>
				<StylizedInput
					placeholder="First Name"
					disableUnderline={true}
					name="studentFirstName"
					onChange={this.props.handleNewInput}
				/>
				<StylizedInput
					placeholder="Email"
					disableUnderline={true}
					name="studentEmail"
					onChange={this.props.handleNewInput}
				/>
				<Button variant="contained" color="primary">
					Add
				</Button>
			</Card>
		);
	}
}

export default CohortAddStudentsForm;
