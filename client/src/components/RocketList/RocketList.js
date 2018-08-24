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
    width: 16rem;
    height: 12rem;
`;

const RocketListCard = Styled(Card)`
    margin: 1rem 1rem 0 0;
    width: 16rem;
    height: 12rem;
`;

const StyledCardContent = Styled(CardContent)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 12rem;
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
                                    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
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
                                    </div>

                                    <div className="RocketCard_content">
                                        <p>{rocket.title}</p>
                                        <p>Total Classes {3}</p>
                                    </div>
                                    <Link to={`/rocket/view/${rocket._id}`} style={{textDecoration: 'none'}}>
                                        <Button variant="contained" color="primary">
                                            View
                                        </Button>
                                    </Link>
                                </StyledCardContent>
                            </RocketListCard>
                        );
                    })}
                    <RocketAddCard>
                        <StyledCardContent>
                            <p>Add a new Rocket</p>
                            <Button variant="fab" color="primary">
                                <AddIcon onClick={this.handleNewRocket} />
                            </Button>
                        </StyledCardContent>
                    </RocketAddCard>
                </RocketListContainer>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs, deleteRocket }
)(RocketList);
