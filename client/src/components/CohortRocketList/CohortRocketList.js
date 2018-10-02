import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import HighlightOff from '@material-ui/icons/HighlightOff';
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
    min-height: 4rem;
    text-align: center;
    color: #3f51b5;
    font-family: 'Roboto', serif;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const RocketListCard = Styled(Card)`
    width: 18rem;
    min-height: 15rem;
`;

const StyledCardContent = Styled(CardContent)`
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 15rem;
    max-height: 15rem;
`;

const RocketCardTop = Styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 0.5rem;
`;

const RocketCardMid = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const AddRocketWrap = Styled(RocketListCard)`
    margin: .5rem;
    height:15.5rem;
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
    height: 10rem;
    flex-direction: column;
    margin: 0;
`;

const RocketSearch = Styled.input`
    flex-grow: 3;
    margin-right: .5rem;
    border: 1px solid #8BB8D488 !important;
    min-height: 2.5rem;
    padding: 0.5rem;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
`;

const RocketAddTop = Styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
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
        rocketSearch: '',
    };

    toggleModal = e => {
        this.setState(prevstate => {
            return { toggleVis: !prevstate.toggleVis, rocketSearch: '' };
        });
        this.generateRocketAddLinks();
    };

    rocketChoice = rocketID => {
        this.toggleModal();
        this.props.handlePickRocket(rocketID);
    };

    generateRocketSelector = () => {
        const filteredCohort = this.props.state.user.cohorts[this.props.cohortIDX];

        if (filteredCohort !== undefined) {
            return filteredCohort.rockets.map(rocket => {
                return (
                    <CohortRocketCard
                        key={rocket._id}
                        rocket={rocket}
                        cohortID={this.props.cohortID}
                        history={this.props.history}
                    />
                );
            });
        }
        return [];
    };

    componentDidMount() {
        this.generateRocketAddLinks();
    }

    generateRocketAddLinks = () => {
        let filteredList = this.props.state.user.rockets;
        if (this.state.rocketSearch !== '') {
            filteredList = this.props.state.user.rockets.filter(rocket => {
                return (
                    rocket.title.toLowerCase().search(this.state.rocketSearch.toLowerCase()) !== -1
                );
            });
        }
        const rocketAddLinks = filteredList.map(rocket => {
            return (
                <RocketMenuItem rocket={rocket} key={rocket._id} rocketChoice={this.rocketChoice} />
            );
        });
        rocketAddLinks.push(<CreateNewRocketLink key={`CNRL_KEY`} />);
        this.setState({ rocketAddLinks });
    };

    handleRocketSearch = e => {
        this.setState({ rocketSearch: e.target.value });
        this.generateRocketAddLinks();
    };

    render() {
        return (
            <Card className={this.props.className}>
                <AddRocketWrap>
                    {this.state.toggleVis ? (
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
                                    <RocketAddTop>
                                        <RocketSearch
                                            placeholder="Search Rockets"
                                            onChange={this.handleRocketSearch}
                                            autoComplete="off"
                                        />
                                        <Button
                                            variant="fab"
                                            color="secondary"
                                            mini
                                            onClick={this.toggleModal}
                                        >
                                            <HighlightOff />
                                        </Button>
                                    </RocketAddTop>
                                </FloatingAdd>
                            </RocketCardTop>
                            <RocketCardMid>
                                <RocketAddToggle toggleVis={this.state.toggleVis}>
                                    {this.state.rocketAddLinks}
                                </RocketAddToggle>
                            </RocketCardMid>
                        </StyledCardContent>
                    ) : (
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
                                    <RocketAddTop>
                                        <h1 style={{ flexGrow: '3', textAlign: 'center' }}>
                                            ADD ROCKETS
                                        </h1>
                                        <Button
                                            variant="fab"
                                            color="primary"
                                            mini
                                            onClick={this.toggleModal}
                                        >
                                            <AddIcon />
                                        </Button>
                                    </RocketAddTop>
                                </FloatingAdd>
                            </RocketCardTop>
                            <RocketCardMid>
                                <RocketAddToggle toggleVis={this.state.toggleVis}>
                                    {this.state.rocketAddLinks}
                                </RocketAddToggle>
                            </RocketCardMid>
                        </StyledCardContent>
                    )}
                </AddRocketWrap>
                {this.generateRocketSelector()}
            </Card>
        );
    }
}

export default connect(mapStateToProps)(CohortRocketList);
