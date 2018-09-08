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
    padding: 1rem 0 0 0;
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
    };
    handleAddRocket = rocket => {
        this.props.addRocket(rocket, this.props.state.user.uid);
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }



    render() {
        return (
            <MainContainer>
                {/* TODO PASS ACTION TO ROCKET FORM AS A PROP */}
                <RocketForm
                    handleSubmit={this.handleAddRocket}
                    history={this.props.history}
                    title=""
                    td={generateDefaults()}
                    tw={generateDefaults()}
                    tm={generateDefaults()}
                    newForm
                />
            </MainContainer>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, addRocket }
)(Rocket);
