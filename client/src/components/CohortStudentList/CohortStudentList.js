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
    componentDidMount() {
    }

    render() {
        return (
            <Card className={this.props.className}>
                {this.props.state.user.cohorts[this.props.cohortID].students.length === 0 ? 'Please add Students to your class' : null}
                {/* Render all students added if the cohort exists with that index*/}
                {this.props.state.user.cohorts[this.props.cohortID] ? this.props.state.user.cohorts[this.props.cohortID].students.map(
                    (student, index) => (
                        <CohortStudentCard student={student} key={`student_${index}`} />
                    )
                ): null}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortStudentList);
