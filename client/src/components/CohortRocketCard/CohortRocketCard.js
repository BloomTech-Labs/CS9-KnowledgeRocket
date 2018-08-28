import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import {appendRocket} from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedRocket = styled(Card)`
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    margin: 10px;
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
    width: 12rem;
`;

class CohortRocketCard extends Component {
    state = {
        userRocket: { title: '', twoDay: {}, twoWeek: {}, twoMonth: {} },
        scheduledRocket: {},
        newDate: '',
        timezone: ''
    };

    componentDidMount() {
        const rocketID = this.props.rocket.rocketId;
        const rocketData = this.props.state.user.rockets.filter(rocket => {
            if (rocket._id === rocketID) {
                return true;
            }
            return false;
        })[0];
        console.log(rocketData, this.props.rocket);
        const timezone = moment.tz.guess();
        if (rocketData) {
            this.setState({ timezone, userRocket: rocketData, scheduledRocket: this.props.rocket, newDate: Date.now() });
        }
    }

    handleDateChange = (e) => {
        console.log('Handle Date from Calendar', e.target.value)
        const newDate = Date.parse(e.target.value)
        console.log('Handle Date from Calendar parsed:', newDate)
        // const momentDate = Date.parse(moment.tz(newDate, this.state.timezone).format());
        this.setState({newDate});
    }

    reScheduleRocket = (e) => {
        const newDate = Date.parse(new Date(new Date(this.state.newDate).setHours(0,0,0,0)));
        console.log('newDate', newDate)
        console.log('newDate', newDate)
        // const rocketID = this.props.rocket.rocketId;
        // const userID = this.props.state.user._id;
        // const cohortID = this.props.cohortID;
        // console.log(rocketID, newDate, userID, cohortID)
        // this.props.appendRocket(rocketID, newDate, userID, cohortID);
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <StylizedRocket>
                <CardContent>
                    <p>{this.state.userRocket.title}</p>
                    <StylizedCohorts>
                        <ClipQuestion>{this.state.userRocket.twoDay.question}</ClipQuestion>
                        <ClipQuestion>{this.state.userRocket.twoWeek.question}</ClipQuestion>
                        <ClipQuestion>{this.state.userRocket.twoMonth.question}</ClipQuestion>
                    </StylizedCohorts>
                    {/* <CohortLabel>{`Scheduled on ${moment(Date.parse(this.props.rocket.startDate)).format('MMM Do YY')}`}</CohortLabel> */}
                    {/* <CohortLabel>{`Scheduled on ${moment(Date.parse(moment.tz(this.props.rocket.startDate, this.state.timezone))+24*60*60*1000).format('MMM Do YY')}`}</CohortLabel> */}
                    <CohortLabel>{`Scheduled on ${new Date(this.props.rocket.startDate).toDateString()}`}</CohortLabel>
                    <TextField
                        style={{ margin: '.5rem 0' }}
                        id="date"
                        label="Re-Schedule ?"
                        type="date"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleDateChange}
                    />
                    <Button variant="contained" color="primary" onClick={this.reScheduleRocket}>
                        Re-Schedule
                    </Button>
                </CardContent>
            </StylizedRocket>
        );
    }
}

export default connect(mapStateToProps, {appendRocket})(CohortRocketCard);
