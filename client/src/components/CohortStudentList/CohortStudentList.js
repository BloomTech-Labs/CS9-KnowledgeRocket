import React, { Component } from 'react';
// Material Components
import Card from '@material-ui/core/Card';
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
