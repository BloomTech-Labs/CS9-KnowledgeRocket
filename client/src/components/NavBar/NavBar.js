import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Material Components
import { SvgIcon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Actions
import { logOutUser } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledNavBarContainer = styled(AppBar)`
    padding: 1rem;
    display: flex;
    flex-direction: row !important;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative !important;
    margin-bottom: 20px;
`;

const StyledBreadCrumbContainer = styled(Toolbar)`
    display: flex;
`;

const StyledCrumb = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.1rem;
`;

const StyledSvg = styled(SvgIcon)`
    color: #f50057 !important;
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
                    {this.props.state.breadcrumb.labels.map((item, index) => (
                        <StyledCrumb key={item + index}>
                            <Link
                                to={this.props.state.breadcrumb.paths[index]}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button style={{ color: 'white' }}> {item} </Button>
                            </Link>
                            <StyledSvg color="primary">
                                <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                            </StyledSvg>
                        </StyledCrumb>
                    ))}
                </StyledBreadCrumbContainer>
                <Button onClick={this.handleLogOut} variant="contained" color="secondary">
                    Sign-Out
                </Button>
            </StyledNavBarContainer>
        );
    }
}

export default connect(mapStateToProps, { logOutUser })(NavBar);
