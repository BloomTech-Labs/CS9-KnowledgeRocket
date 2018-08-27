import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button, SvgIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../actions';
// import './index.css';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledNavBarContainer = styled.div`
    padding: 1rem;
    display: flex;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
`;

const StyledBreadCrumbContainer = styled.div`
    display: flex;
`;

const StyledCrumb = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.1rem;
`;

class NavBar extends Component {
    componentDidMount() {
        if (!this.props.state.user.authenticated) {
            // this.props.history.push('/rocket/auth');
        }
    }

    handleLogOut = () => {
        this.props.logOutUser();
        this.props.history.push('/rocket/auth');
    };

    render() {
        console.log(this.props);
        return (
            <StyledNavBarContainer>
                <StyledBreadCrumbContainer>
                    {this.props.state.breadcrumb.labels.map((item, index) => {
                        return (
                            <StyledCrumb key={item + index}>
                                <Link
                                    to={this.props.state.breadcrumb.paths[index]}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button> {item} </Button>
                                </Link>
                                <SvgIcon color="primary">
                                    <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                                </SvgIcon>
                            </StyledCrumb>
                        );
                    })}
                </StyledBreadCrumbContainer>
                <Button onClick={this.handleLogOut} variant="contained" color="secondary">
                    Sign-Out
                </Button>
            </StyledNavBarContainer>
        );
    }
}

export default connect(mapStateToProps, { logOutUser })(NavBar);
