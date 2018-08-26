import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CohortRocketCard from '../CohortRocketCard/CohortRocketCard';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import Card from '@material-ui/core/Card';

function mapStateToProps(state) {
    return {
        state,
    };
}

const FloatingAdd = Styled.div`
    width: 3rem; 
    height: inherit;
    text-align: center;
    color: white;
    text-shadow: -1px -1px 0 #000 , 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0px 0px 8px #000000dd;
`;

const RocketListCard = Styled(Card)`
    margin: 1rem 1rem 0 0;
    width: 20rem;
    min-height: 16rem;
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
    justify-content: flex-start;
    width: 100%;
    min-height: 10rem;
`;

const AddRocketWrap = Styled(RocketListCard)`
    min-height: 1rem;
`;

const HorizontalDivider = Styled.hr`
    border: 1px solid black;
`;

class RocketMenuItem extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    width: '100%',
                    height: '4rem',
                    border: '1px solid black',
                    backgroundColor: '#000',
                    borderRadius: '0.5rem',
                    marginBottom: '0.3rem',
                }}
            >
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
                    <h1>{this.props.rocket.title}</h1>
                    <Button
                        variant="fab"
                        color="primary"
                        mini
                        onClick={e => this.props.rocketChoice(this.props.rocket._id, Date.now())}
                    >
                        <AddIcon />
                    </Button>
                </FloatingAdd>
            </div>
        );
    }
}

class CreateNewRocketLink extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    width: '100%',
                    height: '4rem',
                    border: '1px solid black',
                    backgroundColor: '#000',
                    borderRadius: '0.5rem',
                    marginBottom: '0.3rem',
                }}
            >
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
                    <h1>Create a New Rocket</h1>
                    <Link to="/rocket/new">
                        <Button variant="fab" color="primary" mini>
                            <AddIcon />
                        </Button>
                    </Link>
                </FloatingAdd>
            </div>
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
        console.log(rocketID, this.props);
        this.props.handlePickRocket(rocketID);
    };

    generateRocketSelector = () => {
        const rocketSelectors = this.props.state.user._id
            ? this.props.state.user.cohorts[
                  this.props.state.user.cohorts.reduce((acc, curr, index) => {
                      return (acc = curr._id === this.props.cohortID ? index : 0);
                  })
              ].rockets.map(rocket => {
                  return <CohortRocketCard key={rocket._id} rocket={rocket} />;
              })
            : []; /*THIS IS IMPORTANT TO NOT ERROR OUT DO NOT REMOVE*/
        rocketSelectors.push();
        return rocketSelectors;
    };

    generateRocketAddLinks = () => {
        const rocketAddLinks = this.props.state.user.rockets.map(rocket => {
            return (
                <RocketMenuItem rocket={rocket} key={rocket._id} rocketChoice={this.rocketChoice} />
            );
        });
        rocketAddLinks.push(<CreateNewRocketLink />);
        return rocketAddLinks;
    };

    render() {
        // const { anchorEl } = this.state;
        // const open = Boolean(anchorEl);
        return (
            <Card className={this.props.className}>
                {this.generateRocketSelector()}
                <AddRocketWrap>
                    <StyledCardContent>
                        <RocketCardTop>
                            <FloatingAdd
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <h1 style={{ margin: '0 0 1rem 0' }}>ADD ROCKETS</h1>
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
                            <div
                                style={
                                    this.state.toggleVis
                                        ? { display: 'flex', flexDirection: 'column' }
                                        : { display: 'none' }
                                }
                            >
                                {this.generateRocketAddLinks()}
                            </div>

                            <HorizontalDivider />
                        </RocketCardMid>
                    </StyledCardContent>
                </AddRocketWrap>
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortRocketList);
