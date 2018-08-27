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
					name="lastName"
					onChange={this.props.handleNewInput}
					required={true}
				/>
				<StylizedInput
					placeholder="First Name"
					disableUnderline={true}
					name="firstName"
					onChange={this.props.handleNewInput}
					required={true}
				/>
				<StylizedInput
					placeholder="Email"
					disableUnderline={true}
					name="email"
					onChange={this.props.handleNewInput}
					type="email"
					required={true}
					pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])"
				/>
				<Button variant="contained" color="primary" onClick={this.props.handleAddStudent}>
					Add
				</Button>
			</Card>
		);
	}
}

export default CohortAddStudentsForm;
