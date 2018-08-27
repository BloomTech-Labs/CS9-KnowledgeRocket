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
        const cohorts = this.props.state.user.cohorts.filter(each => {
            return each._id === this.props.cohortID ? true : false;
		});
		
		const cohort = cohorts.length > 0 ? cohorts[0] : { students: [{}]}
        return (
            <Card className={this.props.className}>
                {/* Render all students added */}
				{cohort.students.map((student, index) => (
                    <CohortStudentCard student={student} key={`student_${index}`} />
                ))}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortStudentList);
