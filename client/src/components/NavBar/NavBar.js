import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Material Components
import { SvgIcon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
// Components
import ControlPanel from '../ControlPanel/ControlPanel';
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
    state = {
        mobileOpen: false,
    };

    handleLogOut = () => {
        this.props.logOutUser();
        this.props.history.push('/rocket/auth');
    };

    render() {
        return (
            <StyledNavBarContainer>
                <StyledBreadCrumbContainer>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.handleDrawerToggle}
                        // className={classes.navIconHide}
                    >
                        <MenuIcon />
                    </IconButton>
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
                <Hidden mdUp>
                    <ControlPanel
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    />
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    />
                </Hidden>
            </StyledNavBarContainer>
        );
    }
}

export default connect(mapStateToProps, { logOutUser })(NavBar);
