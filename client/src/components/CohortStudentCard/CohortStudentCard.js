import React, { Component } from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
// Material Components
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// Actions
import { deleteStudent } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedCardContent = Styled(CardContent)`
    width: 12rem;
    height: 2.5rem;
    padding: .5rem !important;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    overflow: hidden;
    box-shadow: 0px 2px 6px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    h3 {
        font-family: 'Roboto', serif;
        font-weight: 460;
    }
`;

class CohortStudentCard extends Component {
    state = {
        anchorEl: null,
        student: {},
        status: '',
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleDeleteStudent = () => {
        const studentID = this.props.student._id;
        console.log(`STUDENT ID ${studentID}`);
        this.props.deleteStudent(studentID);
        // this.props.history.push(`/rockets/cohort/${this.props.cohortID}`)
    };

    handleOnClick = () => {
        this.handleDeleteStudent();
        this.handleClose();
    };

    componentDidMount() {
        let myStudent = {};
        let listOfStudents = [];
        this.props.state.user.cohorts.forEach(cohort => {
            if (cohort._id === this.props.cohortID) {
                listOfStudents = cohort.students;
            } else {
            }
        });
        listOfStudents.forEach(student => {
            if (student._id === this.props.studentID) {
                myStudent = student;
            } else {
            }
        });
        this.setState({
            status: this.props.state.user.status,
            student: myStudent,
            cohorts: this.props.state.user.cohorts,
        });
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        // console.log(`COHORT STUDENT CARD PROPS ${JSON.stringify(this.props.student)}`);
        // console.log(`COHORT STUDENT CARD PROPS ${JSON.stringify(this.props.student._id)}`);
        // console.log(`COHORT USER ID ${this.props.state.user._id}`);
        return (
            <StylizedCardContent>
                <h3>{this.props.student.firstName}</h3>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'long-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                            // maxHeight: ITEM_HEIGHT * 4.5,
                            width: 200,
                        },
                    }}
                >
                    <MenuItem onClick={this.handleOnClick}>Remove Student</MenuItem>
                </Menu>
            </StylizedCardContent>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        deleteStudent,
    }
)(CohortStudentCard);
