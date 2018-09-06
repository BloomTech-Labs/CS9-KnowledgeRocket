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
    margin: '0 0 1.5rem 0',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  expansion: {
    display: 'flex',
    padding: '1rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

// RENDERS A CARD FOR EACH STUDENT
class CohortStudentList extends Component {
  render() {
    const { classes } = this.props;

    return (
      <ExpansionPanel className={classes.root}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Your Students</ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansion}>
          {this.props.state.user.cohorts[this.props.cohortID].students.length === 0
            ? 'Please add Students to your class'
            : null}
          {/* Render all students added if the cohort exists with that index*/}
          {this.props.state.user.cohorts[this.props.cohortID]
            ? this.props.state.user.cohorts[this.props.cohortID].students.map((student, index) => (
                <CohortStudentCard
                  student={student}
                  key={`student_${index}`}
                  trigger={this.props.actionClick}
                />
              ))
            : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CohortStudentList));
