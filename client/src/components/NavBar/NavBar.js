import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// Material Components
import SvgIcon from '@material-ui/core/SvgIcon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// Actions
import { logOutUser } from '../../actions';

function mapStateToProps(state) {
    return {
        state,
    };
}

const drawerWidth = 150;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '4.3rem', // Fixed for Smaller Nav Bar
    },
    appBar: {
        position: 'absolute',
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: `100% - ${drawerWidth}px`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#3f51b5',
        [theme.breakpoints.up('md')]: {
            position: 'fixed',
        },
        paddingTop: '5rem',
        zIndex: 0,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

const StyledNavBarContainer = styled(AppBar)`
    padding: 0 .5rem 0 0;
    z-index: 1000;
    display: flex;
    flex-direction: row !important;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    position: fixed !important;
    background-color: #2E3033 !important;
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
    @media (max-width: 500px) {
        display: none;
    }
`;

const StyledSvg = styled(SvgIcon)`
    color: #f50057 !important;
`;

const CPCButton = styled(Button)`
    color: #eeeeee !important;
    border: 1px solid rgb(119, 136, 153);
    background-color: ${props => (props.warning ? 'orange' : '#000000')} !important;
    width: 100%;
    margin-bottom: 1rem !important;
`;

const CPLink = styled(Link)`
    text-decoration: none;
    width: 100%;
`;

class NavBar extends Component {
    state = {
        mobileOpen: false,
    };

    handleLogOut = () => {
        this.props.logOutUser();
        this.props.history.push('/rocket/auth');
    };

    handleDrawerToggle = () => {
        console.log('MADE IT TO handleDrawerToggle  ');
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <StyledNavBarContainer className={classes.appBar}>
                    <StyledBreadCrumbContainer>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
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
                </StyledNavBarContainer>
                <Hidden mdUp>
                    <Drawer
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
                    >
                        <List>
                            <ListItem>
                                <CPLink to="/rocket" onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Rockets</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/classes"  onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Classes</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/billing"  onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Billing</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/settings"  onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Settings</CPCButton>
                                </CPLink>
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <List>
                            <ListItem>
                                <CPLink to="/rocket">
                                    <CPCButton variant="outlined">Rockets</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/classes">
                                    <CPCButton variant="outlined">Classes</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/billing">
                                    <CPCButton variant="outlined">Billing</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/settings">
                                    <CPCButton variant="outlined">Settings</CPCButton>
                                </CPLink>
                            </ListItem>
                        </List>
                    </Drawer>
                </Hidden>
            </div>
        );
    }
}

export default connect(mapStateToProps, { logOutUser })(
    withStyles(styles, { withTheme: true })(NavBar)
);
