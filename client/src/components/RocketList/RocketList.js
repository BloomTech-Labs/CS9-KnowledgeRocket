//@ts-check
import React, { Component } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { generateBreadCrumbs, deleteRocket } from '../../actions';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

function mapStateToProps(state) {
    return {
        state,
    };
}

const RocketListContainer = Styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
`;

const RocketAddCard = Styled(Card)`
    margin: 1rem 1rem 0 0;
    width: 20rem;
    height: 16rem;
`;

const RocketListCard = Styled(Card)`
    margin: 1rem 1rem 0 0;
    width: 20rem;
    height: 16rem;
`;

const StyledCardContent = Styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 16rem;
`;

const RocketCardTop = Styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

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

    handleDeleteRocket = e => {
        // console.log('targets value', e.target.parentElement.id);
        this.props.deleteRocket(e.target.parentElement.id);
    };
    render() {
        return (
            <div className="Main_container">
                {/* {`Welcome To your Rockets: ${this.props.state.user.email}`} */}
                {/* ROCKET CARDS IF ANY ROCKETS ON THE USERS ARAY */}
                {/* ROCKET CARD WITH A + SIGN TO ADD MORE */}
                <RocketListContainer>
                    {this.props.state.user.rockets.map(rocket => {
                        return (
                            <RocketListCard key={rocket._id} id={rocket._id}>
                                <StyledCardContent>
                                    <RocketCardTop>
                                        <Tooltip title="Delete Rocket Permanently">
                                            <Button
                                                variant="fab"
                                                color="secondary"
                                                onClick={this.handleDeleteRocket}
                                                id={rocket._id}
                                                mini
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </Tooltip>
                                    </RocketCardTop>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-start',
                                            width: '100%',
                                            height: '10rem',
                                        }}
                                    >
                                        <div className="RocketCard_content">
                                            <header style={{ fontSize: '2rem' }}>
                                                {rocket.title}
                                            </header>
                                            <hr />
                                            <p>Hard Coded Classes {3}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to={`/rocket/view/${rocket._id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Button variant="contained" color="primary">
                                            View
                                        </Button>
                                    </Link>
                                </StyledCardContent>
                            </RocketListCard>
                        );
                    })}
                    <RocketListCard>
                        <StyledCardContent>
                            <RocketCardTop />
                            <div
                                style={{
                                    margin: '1.8rem 0 0 0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    width: '100%',
                                    height: '7rem',
                                }}
                            >
                                <div className="RocketCard_content">
                                    <header style={{ fontSize: '2rem' }}>
                                        {'Add a New Rocket'}
                                    </header>
                                    <hr />
                                    <p>Click the plus sign to create a new rocket</p>
                                </div>
                            </div>
                            <Button variant="fab" color="primary">
                                <AddIcon onClick={this.handleNewRocket} />
                            </Button>
                        </StyledCardContent>
                    </RocketListCard>
                </RocketListContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, deleteRocket }
)(RocketList);
