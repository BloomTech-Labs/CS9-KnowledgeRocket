import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    state = {
        students: [{}],
    };
    componentDidMount() {
        this.props.state.user.cohorts.forEach(cohort => {
            if (cohort._id === this.props.match.params.id) {
                this.setState({ students: cohort.students });
            } else {

            }
        });
    }
    render() {
        return (
            <Card className={this.props.className}>
                {/* Render all students added */}
                {this.state.students.map((student, index) => (
                    <CohortStudentCard student={student} key={`student_${index}`} />
                ))}
            </Card>
        );
    };
};

export default connect(mapStateToProps)(CohortStudentList);
