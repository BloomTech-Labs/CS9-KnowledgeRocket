import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import moment from 'moment-timezone';
import { appendRocket } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedRocket = styled(Card)`
    width: 18rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: .5rem;
`;

const StylizedCohorts = styled.div`
    text-align: left;
    margin: 10px auto;
`;

const CohortLabel = styled(FormLabel)`
    width: 100%;
    height: 2rem;
    color: black !important;
`;

const ClipQuestion = styled.div`
    display: inline-flex;
    flex-wrap: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
`;

const StyledCardContents = styled(CardContent)`
    font-family: 'Roboto', serif;
    h1 {
        font-weight: bold;
        font-size: 1.5rem;
    }
`

class CohortRocketCard extends Component {
    state = {
        userRocket: { title: '', twoDay: {}, twoWeek: {}, twoMonth: {} },
        scheduledRocket: {},
        newDate: '',
        timezone: '',
    };

    componentDidMount() {
        const rocketID = this.props.rocket.rocketId._id;
        const rocketData = this.props.state.user.rockets.filter(rocket => {
            if (rocket._id === rocketID) {
                return true;
            }
            return false;
        })[0];
        const timezone = moment.tz.guess();
        if (rocketData) {
            this.setState({ timezone, userRocket: rocketData, scheduledRocket: this.props.rocket });
        }
    }

    handleDateChange = e => {
        const newDate = Date.parse(e.target.value);
        this.setState({ newDate });
    };

    reScheduleRocket = e => {
        const newDate = this.state.newDate;
        const rocketID = this.props.rocket.rocketId._id;
        const userID = this.props.state.user._id;
        const cohortID = this.props.cohortID;
        this.props.appendRocket(rocketID, newDate, userID, cohortID);
    };

    render() {
        let scheduledOn = this.props.rocket.startDate
            ? this.props.rocket.startDate.slice(0, 10)
            : Date.now();
        return (
            <StylizedRocket>
                <StyledCardContents>
                    <h1>{this.state.userRocket.title}</h1>
                    <StylizedCohorts>
                        <ClipQuestion>{this.state.userRocket.twoDay.question}</ClipQuestion>
                        <ClipQuestion>{this.state.userRocket.twoWeek.question}</ClipQuestion>
                        <ClipQuestion>{this.state.userRocket.twoMonth.question}</ClipQuestion>
                    </StylizedCohorts>
                    <CohortLabel>{`Scheduled on ${moment(
                        Date.parse(moment.tz(scheduledOn, this.state.timezone))
                    ).format('MMM Do YY')}`}</CohortLabel>
                    <TextField
                        style={{ width: '100%', marginBottom: '1rem' }}
                        id="date"
                        label="Re-Schedule?"
                        type="date"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleDateChange}
                    />
                    <Button variant="contained" color="primary" onClick={this.reScheduleRocket} style={{float: 'right'}}>
                        Re-Schedule
                    </Button>
                </StyledCardContents>
            </StylizedRocket>
        );
    }
}

export default connect(mapStateToProps, { appendRocket })(CohortRocketCard);
