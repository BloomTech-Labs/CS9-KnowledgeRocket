import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, addRocket } from '../../actions';
import RocketForm from './RocketForm';
import axios from 'axios';
const url = process.env.REACT_APP_SERVER;

function mapStateToProps(state) {
    return {
        state,
    };
}

const questionTemplate = {explanation: '',
question: '',
choices: [
    {
        text: 'Answer 1',
    },
    {
        text: 'Answer 2',
    },
    {
        text: 'Answer 3',
    },
    {
        text: 'Answer 4',
    },
],
correct: ''}

class RocketView extends Component {
    state = {
        user: {},
        rocketData: { 
        title: 'DEFAULT', 
        twoDay: questionTemplate, twoWeek: questionTemplate, twoMonth: questionTemplate
},
    };
    handleAddRocket = rocket => {
        this.props.addRocket(rocket, this.props.state.user.uid);
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        // if (!this.props.state.user.authenticated) {
        //     this.props.history.push('/rocket/auth');
        // }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
        let rocketId = this.props.match.params.id;
        this.props.state.user.rockets.forEach((rocket, index) => {
            if (rocket._id === rocketId) {
                this.setState({ rocketData: rocket });
            } else {
            }
        });
    }
    render() {
        console.log(this.state)
        return (
            <div className="Main_container">
                {/* TODO PASS ACTION TO ROCKET FORM AS A PROP */}
                <RocketForm
                    handleSubmit={this.handleAddRocket}
                    history={this.props.history}
                    title={this.state.rocketData.title}
                    td={this.state.rocketData.twoDay}
                    tw={this.state.rocketData.twoWeek}
                    tm={this.state.rocketData.twoMonth}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, addRocket }
)(RocketView);
