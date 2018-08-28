import React from 'react';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

// function mapStateToProps(state) {
//     return {
//         state,
//     };
// }

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
const CohortStudentList = props => {
    // const cohorts = this.props.state.user.cohorts.filter(each => {
    //     return each._id === this.props.cohortID ? true : false;
    // });

    // const cohort = cohorts.length > 0 ? cohorts[0] : { students: [{}] };
    return (
        <Card className={props.className}>
            {/* Render all students added */}

            {props.students.length > 0 ? (
                props.students.map((student, index) => (
                    <CohortStudentCard student={student} key={`student_${index}`} />
                ))
            ) : (
                <h1>Looks like you don't have any students here</h1>
            )}
        </Card>
    );
};

export default CohortStudentList;
// export default connect(mapStateToProps)(CohortStudentList);
