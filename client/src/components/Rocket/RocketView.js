import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, updateRocket } from '../../actions';
import RocketForm from './RocketForm';
import Styled from 'styled-components';

function mapStateToProps(state) {
    return {
        state,
    };
}

const MainContainer = Styled.div`
    padding: 0 1.2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: ${props => props.height};
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
`;

const questionTemplate = {
    explanation: '',
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
    correct: '',
};

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
    handleUpdateRocket = rocket => {
        rocket._id = this.state.rocketData._id;
        rocket.td._id = this.state.rocketData.twoDay._id;
        rocket.tw._id = this.state.rocketData.twoWeek._id;
        rocket.tm._id = this.state.rocketData.twoMonth._id;
        this.props.updateRocket(rocket, this.props.state.user.uid);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        // if (!this.props.state.user.authenticated) {
        //     this.props.history.push('/rocket/auth');
        // }
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
        let rocketId = this.props.match.params.id;
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
        this.props.state.user.rockets.forEach((rocket, index) => {
            if (rocket._id === rocketId) {
                this.setState({ rocketData: rocket });
            } else {
            }
        });
    }

    updateDimensions = () => {
        if (window.windowState === 1) {
            this.setState({
                height: window.innerHeight - 124 + 'px',
            });
        } else {
            this.setState({
                height: document.documentElement.clientHeight - 124 + 'px',
            });
        }
    };

    render() {
        console.log(this.state);
        return (
            <div className="Main_container">
                <MainContainer height={this.state.height}>
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
