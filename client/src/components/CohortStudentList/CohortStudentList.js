import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

function mapStateToProps(state) {
    return {
        state
    };
}

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortStudentList extends Component {

    componentWillUpdate() {
        // console.log(`STUDENT LIST WILL UPDATE ${JSON.stringify(this.props)}`);
    }

    render() {
        // console.log('My StudentList State',this.state)
        // console.log('CohortList cohortID', this.props.cohortID)
        return (
            <Card className={this.props.className}>
                {/* Render all students added */}
                {this.props.state.user.cohorts[this.props.cohortID].students.map(
                    (student, index) => (
                        <CohortStudentCard student={student} key={`student_${index}`} />
                    )
                )}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortStudentList);
// export default CohortStudentList;
