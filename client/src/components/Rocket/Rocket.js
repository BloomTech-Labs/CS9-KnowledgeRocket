import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, addRocket } from '../../actions';
import RocketForm, { generateDefaults } from './RocketForm';
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

class Rocket extends Component {
    state = {
        user: {},
        height: '0px',
    };
    handleAddRocket = rocket => {
        this.props.addRocket(rocket, this.props.state.user.uid);
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
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
        return (
            <div className="Main_container">
                <MainContainer height={this.state.height}>
                    {/* TODO PASS ACTION TO ROCKET FORM AS A PROP */}
                    <RocketForm
                        handleSubmit={this.handleAddRocket}
                        history={this.props.history}
                        title=""
                        td={generateDefaults()}
                        tw={generateDefaults()}
                        tm={generateDefaults()}
                    />
                </MainContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, addRocket }
)(Rocket);
