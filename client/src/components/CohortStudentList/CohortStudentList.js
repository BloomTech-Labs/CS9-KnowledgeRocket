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
        const cohort = this.props.state.user.cohorts.filter(each => {
            return each._id === this.props.cohortID ? true : false;
        });
        return (
            <Card className={this.props.className}>
                {/* Render all students added */}
                {cohort[0].students.map((student, index) => (
                    <CohortStudentCard student={student} key={`student_${index}`} />
                ))}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortStudentList);
