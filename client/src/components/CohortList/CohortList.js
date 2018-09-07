import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import axios from 'axios';
// actions
import { generateBreadCrumbs } from '../../actions';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import { FloatingAdd, ListCard, ListWrapper } from '../RocketList/ListElements';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const url = process.env.REACT_APP_SERVER;

function mapStateToProps(state) {
    return {
        state,
    };
}

const CohortCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

// RENDERS A LIST OF COHORT CARDS
export class CohortList extends Component {
    state = {
        cohort: [{ students: [] }],
        PS: {},
        open: true,
    };

    componentWillUnmount() {
        this.isCancelled = true;
    }

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
        this.props.state.user.cohorts.forEach((cohort, index) => {
            this.calculateParticipationAndSent(cohort, index);
        });
    }

    calculateParticipationAndSent = (cohort, index) => {
        let participation = 0;
        let totalAnswered = 0;
        let totalShouldHaveAnswered = 0;
        const totalStudents = cohort.students.length;
        const today = Date.now();
        // Until Otherwise Figured Out
        // Going to assume that sent = students.length * questions due
        // AKA Total students that Should have answered the questions.

        // If the questions are past due, calculate expected
        // Amount of students that should have answered them.
        if (cohort._id) {
            cohort.rockets.forEach((rocket, idx) => {
                if (today > Date.parse(rocket.td)) {
                    totalShouldHaveAnswered += totalStudents;
                }
                if (today > Date.parse(rocket.tw)) {
                    totalShouldHaveAnswered += totalStudents;
                }
                if (today > Date.parse(rocket.tm)) {
                    totalShouldHaveAnswered += totalStudents;
                }
            });

            // Get Responses Per Questions for This Cohort
            axios
                .get(`${url}/api/responserocket/participation/${cohort._id}`)
                .then(responsesPerQuestion => {
                    totalAnswered = responsesPerQuestion.data.totalResponses;
                    // Calculate the actual percentage that answered the questions
                    // Versus the amount that should have answered them.
                    participation =
                        totalShouldHaveAnswered > 0
                            ? ((totalAnswered * 100) / totalShouldHaveAnswered).toFixed(1)
                            : '100';
                    !this.isCancelled &&
                        this.setState({
                            [cohort._id]: { participation, sent: totalShouldHaveAnswered },
                        });
                })
                .catch(err => {
                    console.error(
                        'Error Fetching Responses for This Cohort',
                        cohort.title,
                        err.message
                    );
                });
        } else {
            return {};
        }
    };

    handleNewCohortRedirect = () => {
        this.props.history.push('/rocket/newclass');
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { message } = this.props.state.user;
        const { status } = this.props.state.user;

        return (
            <ListWrapper>
                {this.state.cohort ? (
                    // user has at least one cohort, render a cohort card
                    <CohortCardContainer>
                        <ListCard
                            add
                            redirect="/rocket/newclass"
                            title="Add New Class"
                            label="Add"
                            contents={[
                                <FloatingAdd
                                    click={this.handleNewCohortRedirect}
                                    key={'FloatingADd_0'}
                                    large
                                />,
                            ]}
                        />
                        {this.props.state.user.cohorts.map((cohort, index) => {
                            if (cohort._id) {
                                return (
                                    <ListCard
                                        key={`CL_${index}`}
                                        title={cohort.title}
                                        redirect={`/rocket/classform/${cohort._id}`}
                                        element={cohort}
                                        contents={[
                                            <p key={`TotalStudents_${cohort._id}`}>
                                                {`Total Students:\t`}
                                                <span style={{ fontWeight: '900' }}>{`(${
                                                    cohort.students.length
                                                })`}</span>
                                            </p>,
                                            <p key={`Participation_${cohort._id}`}>
                                                {`Participation:\t`}
                                                <span style={{ fontWeight: '900' }}>{`(${
                                                    this.state[cohort._id]
                                                        ? this.state[cohort._id].participation
                                                        : 0
                                                }%)`}</span>
                                            </p>,
                                            <p key={`RocketsSent_${cohort._id}`}>
                                                {`Rockets Sent:\t`}
                                                <span style={{ fontWeight: '900' }}>{`(${
                                                    this.state[cohort._id]
                                                        ? this.state[cohort._id].sent
                                                        : 0
                                                })`}</span>
                                            </p>,
                                        ]}
                                    />
                                );
                            }
                            return null;
                        })}
                        {status === 'ADD_COHORT' ? (
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
                        ) : null}
                    </CohortCardContainer>
                ) : null}
            </ListWrapper>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(withStyles(styles)(CohortList));
