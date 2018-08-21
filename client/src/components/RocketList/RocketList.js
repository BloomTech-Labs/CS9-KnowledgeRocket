import React, { Component } from 'react';
import Styled from 'styled-components';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { generateBreadCrumbs } from '../../actions';

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
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 10rem;
`;

class RocketList extends Component {
    componentDidMount() {
        // Checks for User to be Authenticated
        // If not authenticated it will send the user to <login/>
        // If authenticated it will set the state with the current user.
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.props.generateBreadCrumbs(this.props.history.location.pathname);
    }
    render() {
        return (
            <div className="Main_container">
                {/* {`Welcome To your Rockets: ${this.props.state.user.email}`} */}
                {/* ROCKET CARDS IF ANY ROCKETS ON THE USERS ARAY */}
                {/* ROCKET CARD WITH A + SIGN TO ADD MORE */}
                <RocketListContainer>
                    <RocketListCard>
                        <StyledCardContent>
                            <p>Mock Rocket 1</p>
                            <p>Total Classes {3}</p>
                            <Button variant="contained" color="primary">
                                View
                            </Button>
                        </StyledCardContent>
                    </RocketListCard>
                    <RocketListCard>
                        <StyledCardContent>
                            <p>Mock Rocket 2</p>
                            <p>Total Classes {3}</p>
                            <Button variant="contained" color="primary">
                                View
                            </Button>
                        </StyledCardContent>
                    </RocketListCard>
                    <RocketListCard>
                        <StyledCardContent>
                            <p>Last Rocket</p>
                            <p>Total Classes {3}</p>
                            <Button variant="contained" color="primary">
                                View
                            </Button>
                        </StyledCardContent>
                    </RocketListCard>
                    <RocketAddCard>
                        <StyledCardContent>
                            <p>Add a new Rocket</p>
                            <Button variant="fab" color="primary">
                                <AddIcon />
                            </Button>
                        </StyledCardContent>
                    </RocketAddCard>
                </RocketListContainer>
            </div>
        );
    }
}

export default connect(mapStateToProps, {generateBreadCrumbs})(RocketList);
