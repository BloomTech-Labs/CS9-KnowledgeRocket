import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, deleteRocket } from '../../actions';

import {
    RocketListContainer,
    FloatingAdd,
    ListWrapper,
    ListCard,
} from './ListElements';

function mapStateToProps(state) {
    return {
        state,
    };
}

class RocketList extends Component {
    state = {};
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleNewRocket = e => {
        this.props.history.push('/rocket/new');
    };

    handleDeleteRocket = (e, element) => {
        this.props.deleteRocket(element._id);
    };

    calculateCohortsAssigned = (element) => {
        let cohortsAssigned = 0;
        this.props.state.user.cohorts.forEach(cohort =>{
            cohort.rockets.forEach(cohortRocket =>{
                if(cohortRocket._id === element._id) {
                    cohortsAssigned++;
                }
            })
        })
        return cohortsAssigned;
    }

    render() {
        return (
            <div className="Main_container">
                <ListWrapper>
                    <RocketListContainer>
                        <ListCard del={false} add={true} redirect='/rocket/new' title='Add New Rocket' label='Add' contents={[<FloatingAdd large click={this.handleNewRocket}/>]}/>
                        {this.props.state.user.rockets.map((rocket, index) => {
                            const ca = this.calculateCohortsAssigned(rocket)
                            return (
                                <ListCard
                                    key={`RL_${index}`}
                                    contents={[<p>{`Classes Assigned: (${ca})`}</p>]}
                                    title={rocket.title}
                                    redirect={`/rocket/view/${rocket._id}`}
                                    del={this.handleDeleteRocket}
                                    element={rocket}
                                    label={'Edit'}
                                />
                            );
                        })}
                    </RocketListContainer>
                    <FloatingAdd click={this.handleNewRocket} title={'Add Rocket'} floating/>
                </ListWrapper>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, deleteRocket }
)(RocketList);
