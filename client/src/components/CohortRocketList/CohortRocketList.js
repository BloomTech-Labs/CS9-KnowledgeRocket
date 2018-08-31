import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';
import CohortRocketCard from '../CohortRocketCard/CohortRocketCard';

function mapStateToProps(state) {
    return {
        state,
    };
}

const FloatingAdd = Styled.div`
    h1 {
        font-weight: 600;
        font-size: 2rem;
    }
    h1 {
        font-weight: 460;
        font-size: 1.5rem;
    }
    height: inherit;
    min-height: 3rem;
    text-align: center;
    color: #3f51b5;
    font-family: 'Roboto', serif;
    width: 100%;
`;

const RocketListCard = Styled(Card)`
    margin: .5rem;
    width: 18rem;
    min-height: 15rem;
`;

const StyledCardContent = Styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 16rem;
`;

const RocketCardTop = Styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

const RocketCardMid = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const AddRocketWrap = Styled(RocketListCard)`
    min-height: 1rem;
`;

const RocketAddWrapper = Styled.div`
    display: flex;
    flexWrap: nowrap;
    width: 16rem;
    height: 4rem;
    min-height: 4rem;
    border: 1px solid #9A9DA2;
    background-color: #EEEEEE;
    border-radius: 0.5rem;
    margin-top: .5rem;
`;

const RocketAddToggle = Styled.div`
    display: ${props => (props.toggleVis ? 'flex' : 'none')}
    overflow-y: scroll;
    height: 12rem;
    flex-direction: column;
`;
class RocketMenuItem extends Component {
    render() {
        return (
            <RocketAddWrapper>
                <FloatingAdd
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                    }}
                >
                    <h2>{this.props.rocket.title}</h2>
                    <Button
                        variant="fab"
                        color="primary"
                        mini
                        onClick={e => this.props.rocketChoice(this.props.rocket._id, Date.now())}
                    >
                        <AddIcon />
                    </Button>
                </FloatingAdd>
            </RocketAddWrapper>
        );
    }
}

class CreateNewRocketLink extends Component {
    render() {
        return (
            <RocketAddWrapper>
                <FloatingAdd
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem',
                    }}
                >
                    <h2>Create a New Rocket</h2>
                    <Link to="/rocket/new">
                        <Button variant="fab" color="primary" mini>
                            <AddIcon />
                        </Button>
                    </Link>
                </FloatingAdd>
            </RocketAddWrapper>
        );
    }
}

class CohortRocketList extends Component {
    state = {
        toggleVis: false,
    };

    toggleModal = e => {
        this.setState(prevstate => {
            return { toggleVis: !prevstate.toggleVis };
        });
    };

    rocketChoice = rocketID => {
        this.props.handlePickRocket(rocketID);
    };

    generateRocketSelector = () => {
        const filteredCohort = this.props.state.user.cohorts[
            this.props.state.user.cohorts.reduce((acc, curr, index) => {
                let myIndex = (acc = curr._id === this.props.cohortID ? index : 0);
                return myIndex;
            }, 0)
        ];

        if (filteredCohort.rockets !== undefined) {
            return filteredCohort.rockets.map(rocket => {
                return (
                    <CohortRocketCard
                        key={rocket._id}
                        rocket={rocket}
                        cohortID={this.props.cohortID}
                    />
                );
            });
        }
        return [];
    };

    generateRocketAddLinks = () => {
        const rocketAddLinks = this.props.state.user.rockets.map(rocket => {
            return (
                <RocketMenuItem rocket={rocket} key={rocket._id} rocketChoice={this.rocketChoice} />
            );
        });
        rocketAddLinks.push(<CreateNewRocketLink key={`CNRL_KEY`} />);
        return rocketAddLinks;
    };

    render() {
        return (
            <Card className={this.props.className}>
                <AddRocketWrap>
                    <StyledCardContent>
                        <RocketCardTop>
                            <FloatingAdd
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <h1>ADD ROCKETS</h1>
                                <Button
                                    variant="fab"
                                    color="primary"
                                    mini
                                    onClick={this.toggleModal}
                                >
                                    <AddIcon />
                                </Button>
                            </FloatingAdd>
                        </RocketCardTop>
                        <RocketCardMid>
                            <RocketAddToggle toggleVis={this.state.toggleVis}>
                                {this.generateRocketAddLinks()}
                            </RocketAddToggle>
                        </RocketCardMid>
                    </StyledCardContent>
                </AddRocketWrap>
                {this.generateRocketSelector()}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortRocketList);
