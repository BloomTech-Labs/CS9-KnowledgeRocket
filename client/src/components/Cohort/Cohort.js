import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// Components
import CohortSettingForm from '../CohortSettingForm/CohortSettingForm';
import CohortAddStudentsForm from '../CohortAddStudentsForm/CohortAddStudentsForm';
import CohortStudentList from '../CohortStudentList/CohortStudentList';
import CohortRocketList from '../CohortRocketList/CohortRocketList';
// Actions
import { generateBreadCrumbs, addCohort, appendRocket } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledHeaders = styled.h2`
    align-self: flex-start;
    font-size 2rem;
    margin-bottom: 1.5rem;
    font-family: 'Roboto', serif;
`;

const CohortFormMainContainer = styled.div`
    padding: 1rem 1rem 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-height: 60rem;
`;

const StyledCohortSettingForm = styled(CohortSettingForm)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0rem 0rem 1rem;
    margin-bottom: 1rem;
    width: 100%;
    background-color: white;
    border-radius: 0.4rem;
    box-shadow: var(--grayRedBlue_shadow);
    @media (max-width: 510px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const StyledCohortAddStudentForm = styled(CohortAddStudentsForm)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    margin-bottom: 20px;
    @media (max-width: 800px) {
        flex-direction: column;
        align-items: flex-start;
        height: 16rem;
    }
`;

const StyledCohortStudentList = styled(CohortStudentList)`
    position: relative;
    padding: 0.5rem 0.5rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;
`;

const StyledCohortRocketList = styled(CohortRocketList)`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 2rem;
`;

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class Cohort extends Component {
    state = {
        title: '',
        startDate: {
            /* objectID : date*/
            objectID: 0,
        },
        cohort: {
            ccEmail: false,
            rockets: { _id: '', rocketId: '', startDate: '', td: '', tw: '', tm: '' },
            students: [{}],
            title: '',
            _id: '',
        },
        cohortIDX: 0,
        ccEmail: false,
        open: false,
        expand: false,
    };

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        let cohortIDX;
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs('/rocket/classes');
        let cohort = {};
        this.props.state.user.cohorts.forEach((ch, index) => {
            if (ch._id === this.props.match.params.id) {
                cohort = ch;
                cohortIDX = index;
            }
        });
        
        this.setState({
            startDate: { objectID: Date.now() },
            cohort,
            cohortIDX: cohortIDX,
            title: cohort.title,
        });
    }

    handleNewInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCheckBox = e => {
        this.setState({ cohort: { ccEmail: !!e.target.checked } });
    };

    handleAddCohort = () => {
        const cohort = {
            title: this.state.title,
        };
        this.props.addCohort(cohort, this.props.state.user._id);
    };

    handleAppendRocket = (rocketID, startDate) => {
        //startDate:
        this.setState({
            startDate: { [rocketID]: startDate },
        });
        this.props.appendRocket(
            rocketID,
            startDate,
            this.props.state.user._id,
            this.props.match.params.id
        );
        this.handleActionClick();
    };

    handlePickRocket = rocketID => {
        const today = new Date(new Date().setUTCHours(0, 0, 0, 0));
        this.handleAppendRocket(rocketID, Date.parse(today));
    };
    handleAddStudent = () => {
        const { firstName, lastName, email } = this.state;
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.match.params.id;
        const student = {
            firstName: firstName,
            lastName: lastName,
            email: email,
        };

        this.props.addStudent(student, teacherID, cohortID);
    };

    handleActionClick = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleExpandStudentList = (value) => {
        this.setState({expand: value});
    }

    render() {
        const { classes } = this.props;
        const { message } = this.props.state.user;

        const cohortID = this.props.match.params.id;
        let cohortIDX;
        this.props.state.user.cohorts.forEach((ch, index) => {
            if (ch._id === this.props.match.params.id) {
                cohortIDX = index;
            }
        });

        return (
            <CohortFormMainContainer>
                <StyledHeaders>Class Settings</StyledHeaders>
                <StyledCohortSettingForm
                    handleNewInput={this.handleNewInput}
                    handleCheckBox={this.handleCheckBox}
                    cohortID={cohortID}
                    cohortIDX={cohortIDX}
                    title={this.state.title}
                    addCohort={this.props.addCohort}
                    actionClick={this.handleActionClick}
                />
                <StyledHeaders>Add Students</StyledHeaders>
                <StyledCohortAddStudentForm
                    expand={this.handleExpandStudentList}
                    cohortID={this.props.match.params.id}
                    actionClick={this.handleActionClick}
                />
                <StyledHeaders>Students</StyledHeaders>
                <StyledCohortStudentList
                    handleExpand={this.handleExpandStudentList}
                    expand={this.state.expand}
                    students={this.state.cohort.students}
                    match={this.props.match}
                    cohortID={cohortIDX}
                    actionClick={this.handleActionClick}
                />
                <StyledHeaders>Knowledge Rockets</StyledHeaders>
                <StyledCohortRocketList
                    handlePickRocket={this.handlePickRocket}
                    cohortID={this.props.match.params.id}
                    cohortIDX={cohortIDX}
                    history={this.props.history}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleRequestClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </CohortFormMainContainer>
        );
    }
}
export default connect(mapStateToProps, {
    generateBreadCrumbs,
    addCohort,
    appendRocket,
})(withStyles(styles)(Cohort));
