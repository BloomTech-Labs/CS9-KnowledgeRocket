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
        sheduledRocket: {},
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
        if (rocketData) {
            this.setState({ userRocket: rocketData, sheduledRocket: this.props.rocket });
        }
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
                    <CohortLabel>{`Scheduled on ${moment(
                        this.state.sheduledRocket.startDate
                    ).format('MMM Do YY')}`}</CohortLabel>
                    <TextField
                        style={{ margin: '.5rem 0' }}
                        id="date"
                        label="Re-Schedule ?"
                        type="date"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button variant="contained" color="primary">
                        Re-Schedule
                    </Button>
                </CardContent>
            </StylizedRocket>
        );
    }
}

export default connect(mapStateToProps)(CohortRocketCard);
