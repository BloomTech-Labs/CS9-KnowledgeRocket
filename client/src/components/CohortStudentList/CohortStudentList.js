import React, { Component } from 'react';
import { connect } from 'react-redux';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Components
import CohortStudentCard from '../CohortStudentCard/CohortStudentCard';

function mapStateToProps(state) {
  return {
    state,
  };
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

// CONTAINS THE LAST NAME, FIRST NAME, EMAIL, ADD BTN TO ADD STUDENTS
class CohortStudentList extends Component {
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    // return (
    //   <Card className={this.props.className}>
    //     {this.props.state.user.cohorts[this.props.cohortID].students.length === 0
    //       ? 'Please add Students to your class'
    //       : null}
    //     {/* Render all students added if the cohort exists with that index*/}
    //     {this.props.state.user.cohorts[this.props.cohortID]
    //       ? this.props.state.user.cohorts[this.props.cohortID].students.map((student, index) => (
    //           <CohortStudentCard
    //             student={student}
    //             key={`student_${index}`}
    //             trigger={this.props.actionClick}
    //           />
    //         ))
    //       : null}
    //   </Card>

    return (
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Your Students</ExpansionPanelSummary>
      </ExpansionPanel>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CohortStudentList));
