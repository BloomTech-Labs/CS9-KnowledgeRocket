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
				<StylizedInput defaultValue="Last Name" disableUnderline="true" />
				<StylizedInput defaultValue="First Name" disableUnderline="true" />
				<StylizedInput defaultValue="Email" disableUnderline="true" />
				<Button variant="contained" color="primary">
					Add
				</Button>
			</Card>
		);
	}
}

export default CohortAddStudentsForm;
