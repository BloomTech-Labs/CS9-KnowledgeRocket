import React, { Component } from 'react';
import { connect } from 'react-redux';
import { generateBreadCrumbs, deleteRocket } from '../../actions';

import { RocketListContainer, FloatingAdd, ListWrapper, ListCard } from './ListElements';

function mapStateToProps(state) {
    return {
        state,
    };
}

class RocketList extends Component {
    state = {
        rocketCounter: {},
    };
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        // Getting Total Rockets assigned to cohort for each rocket.
        let rocketCounter = {};
        this.props.state.user.cohorts.forEach((c, ci) => {
            c.rockets.forEach((r, ri) => {
                if (rocketCounter[`${r.rocketId}`] === undefined) {
                    rocketCounter[`${r.rocketId}`] = 1;
                } else if (rocketCounter[`${r.rocketId}`]) {
                    rocketCounter[`${r.rocketId}`] += 1;
                }
            });
        });
        this.setState({ rocketCounter });
        // Do not Remove top Lines: needed for Rocket List

        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }

    handleNewRocket = e => {
        this.props.history.push('/rocket/new');
    };

    handleDeleteRocket = (e, element) => {
        this.props.deleteRocket(element._id);
    };

    render() {
        console.log(this.state.rocketCounter);
        return (
            <ListWrapper>
                <RocketListContainer>
                    <ListCard
                        del={false}
                        add={true}
                        redirect="/rocket/new"
                        title="Add New Rocket"
                        label="Add"
                        contents={[<FloatingAdd large click={this.handleNewRocket}/>]}
                    />
                    {this.props.state.user.rockets.map((rocket, index) => {
                        return (
                            <ListCard
                                key={`RL_${index}`}
                                contents={[
                                    <p>
                                        {`Classes Assigned:\t`}
                                        <span style={{ fontWeight: '900' }}>{`(${
                                            this.state.rocketCounter[rocket._id]
                                                ? this.state.rocketCounter[rocket._id]
                                                : 0
                                        })`}</span>
                                    </p>,
                                ]}
                                title={rocket.title}
                                redirect={`/rocket/view/${rocket._id}`}
                                del={this.handleDeleteRocket}
                                element={rocket}
                                label={'Edit'}
                            />
                        );
                    })}
                </RocketListContainer>
            </ListWrapper>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, deleteRocket }
)(RocketList);
