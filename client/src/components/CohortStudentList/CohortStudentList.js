import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

function mapStateToProps(state) {
	return {
		state,
	};
}

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortStudentList extends Component {
	render() {
		console.log(`PROPS ${this.props}`);
		return (
			<Card className={this.props.className}>
				{/* Render all students added */}
				{this.props.students.map((student, index) => <CohortStudentCard student={student} />)}
			</Card>
		);
	}
}

export default connect(mapStateToProps)(CohortStudentList);
