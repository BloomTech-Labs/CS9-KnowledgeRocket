import React, { Component } from 'react';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortStudentList extends Component {
	render() {
		console.log(`COHORT LIST PROPS ${JSON.stringify(this.props)}`);
		return (
			<Card className={this.props.className}>
				{/* Render all students added */}
				{this.props.students.map((student, index) => <CohortStudentCard student={student} />)}
			</Card>
		);
	}
}

export default CohortStudentList;
