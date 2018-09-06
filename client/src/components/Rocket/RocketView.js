import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, updateRocket } from '../../actions';
import RocketForm, { generateDefaults } from './RocketForm';
import styled from 'styled-components';

function mapStateToProps(state) {
    return {
        state,
    };
}

const MainContainer = styled.div`
    padding: 1rem 1.2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const questionTemplate = generateDefaults();

class RocketView extends Component {
    state = {
        user: {},
        rocketData: {
            title: 'DEFAULT',
            twoDay: questionTemplate,
            twoWeek: questionTemplate,
            twoMonth: questionTemplate,
            height: '0px',
        },
    };

    componentDidMount() {
        let rocketId = this.props.match.params.id;

        // Checks for Authenticated Users before showing information.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        // Breadcrumb Generation Routine
        // Hard Coded the Path for the Breadcrumbs
        this.props.generateBreadCrumbs('/rocket/');

        // Filter through the user's Rocket's and find the correct one to display.
        this.props.state.user.rockets.forEach((rocket, index) => {
            if (rocket._id === rocketId) {
                this.setState({ rocketData: rocket });
            } else {
                // TODO: Implement functionality to display error if ID is not found in user's rockets.
            }
        });
    }

    handleUpdateRocket = rocket => {
        rocket._id = this.state.rocketData._id;
        rocket.td._id = this.state.rocketData.twoDay._id;
        rocket.tw._id = this.state.rocketData.twoWeek._id;
        rocket.tm._id = this.state.rocketData.twoMonth._id;
        this.props.updateRocket(rocket, this.props.state.user.uid);
    };

    render() {
        return (
            <div>
                <MainContainer>
                    <RocketForm
                        handleSubmit={this.handleUpdateRocket}
                        history={this.props.history}
                        title={this.state.rocketData.title}
                        td={this.state.rocketData.twoDay}
                        tw={this.state.rocketData.twoWeek}
                        tm={this.state.rocketData.twoMonth}
                    />
                </MainContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, updateRocket }
)(RocketView);
