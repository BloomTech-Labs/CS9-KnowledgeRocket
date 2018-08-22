import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortStudentList extends Component {
	render() {
		return (
			<Card className={this.props.className}>
				{/* Render all students added */}
				<CohortStudentCard />
				<CohortStudentCard />
				<CohortStudentCard />
				<CohortStudentCard />
				<CohortStudentCard />
				<CohortStudentCard />
			</Card>
		);
	}
}

export default CohortStudentList;
