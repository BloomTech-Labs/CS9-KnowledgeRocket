import React, {Component} from 'react';
import {connect} from 'react-redux';
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
    state = {
        students: [{}],
    };

    componentDidMount() {
        console.log('Mounted CohortStudentList')
        let listOfStudents = [];
        this.props.state.user.cohorts.forEach(cohort => {
            if (cohort._id === this.props.cohortID) {
                listOfStudents = cohort.students;
            } else {

            }
        });
        this.setState({ students: listOfStudents, status: this.props.state.user.status });
    }

    componentWillReceiveProps() {
        console.log('CWRP',this.props)
    }

    generateStudents() {
        return this.state.students.map((student, index) => (
            <CohortStudentCard student={student} key={`student_${index}_${Date.now()}`} match={this.props.match} status={this.props.status}
            studentID={this.props.studentID} cohortID={this.props.cohortID} history={this.props.history}/>
        ))
    }

    render() {
        console.log('My StudentList State',this.state)
        return (
            <Card className={this.props.className}>
                {this.props.state.user.status}
                {this.props.state.user.status ? this.generateStudents() : null}
            </Card>
        );
    };
};

export default connect(mapStateToProps)(CohortStudentList);
// export default CohortStudentList;
