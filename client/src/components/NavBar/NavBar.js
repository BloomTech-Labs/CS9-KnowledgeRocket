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
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
// Actions
import { logOutUser } from '../../actions';
import { smallBreakPoint } from '../Themes/Themes';

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
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

const StyledNavBarContainer = styled(AppBar)`
    padding: 0 0.5rem 0 0;
    z-index: 1000;
    display: flex;
    flex-direction: row !important;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    position: fixed !important;
    background-color: #2e3033 !important;
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
    ${smallBreakPoint(`
        display: none;
    `)};
`;

const StyledSvg = styled(SvgIcon)`
    color: #f50057 !important;
`;

export const CPCButton = styled(Button)`
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

const AccountSection = styled.div`
    display: ${props => (props.authenticated ? 'inline-flex' : 'none')} !important;
    justify-content: flex-end;
    align-items: center;
`;

const Avatar = styled.svg`
    path {
        fill: ${props => (props.type === 'free' ? 'white' : 'rgb(220, 253, 198)')};
    }
    height: 2rem;
    width: 2rem;
    @media (max-width: 620px) {
        display: none;
    }
`;

const AccountType = styled(Link)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 2rem;
    font-family: 'Roboto', serif;
    font-size: 0.9rem;
    margin: 0 1rem;
    text-decoration: none;
    color: ${props => (props.type === 'free' ? 'white' : 'rgb(116, 167, 82)')};
    &:hover {
        color: rgb(220, 253, 198);
    }
    @media (max-width: 570px) {
        font-size: 0.7rem;
    }
    @media (max-width: 420px) {
        display: none;
    }
`;

class NavBar extends Component {
    state = {
        mobileOpen: false,
        open: false,
    };

    componentDidMount() {
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
    }

    handleLogOut = () => {
        this.props.logOutUser();
        this.handleActionClick();
        this.props.history.push('/rocket/auth');
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handleActionClick = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    generateAccountText = () => {
        let timeLeft = 0;
        const today = Date.now();
        const expiration = Date.parse(this.props.state.user.expiration);
        // Calculate remaining time
        const remainingTime = (expiration - today) / 1000 / 60 / 60 / 24;
        timeLeft = remainingTime > 0 ? remainingTime : 0;
        timeLeft = timeLeft.toFixed();

        if (this.props.state.user.account === 'monthly') {
            return (
                <div>
                    <div>{`Account: Premium`}</div>
                    <div>{`Time Left: ${timeLeft} days`}</div>
                </div>
            );
        }
        if (this.props.state.user.account === 'yearly') {
            return (
                <div>
                    <div>{`Account: Premium`}</div>
                    <div>{`Time Left: ${timeLeft} days`}</div>
                </div>
            );
        }

        if (this.props.state.user.account === 'free') {
            return `Account: Free`;
        }
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
                    <AccountSection authenticated={this.props.state.user.authenticated}>
                        <Avatar
                            type={this.props.state.user.account}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                        >
                            <path d="M9 1C4.58 1 1 4.58 1 9s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 2.75c1.24 0 2.25 1.01 2.25 2.25S10.24 8.25 9 8.25 6.75 7.24 6.75 6 7.76 3.75 9 3.75zM9 14.5c-1.86 0-3.49-.92-4.49-2.33C4.62 10.72 7.53 10 9 10c1.47 0 4.38.72 4.49 2.17-1 1.41-2.63 2.33-4.49 2.33z" />
                        </Avatar>
                        <AccountType to="/rocket/billing" type={this.props.state.user.account}>
                            {this.generateAccountText()}
                        </AccountType>
                        <Button
                            onClick={this.handleLogOut}
                            variant="contained"
                            color="secondary"
                            style={
                                this.props.state.user.authenticated
                                    ? { display: 'flex' }
                                    : { display: 'none' }
                            }
                        >
                            Sign Out
                        </Button>
                    </AccountSection>
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
                        style={
                            this.props.state.user.authenticated
                                ? { display: 'flex' }
                                : { display: 'none' }
                        }
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
                                <CPLink to="/rocket/classes" onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Classes</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/billing" onClick={this.handleDrawerToggle}>
                                    <CPCButton variant="outlined">Billing</CPCButton>
                                </CPLink>
                            </ListItem>
                            <ListItem>
                                <CPLink to="/rocket/settings" onClick={this.handleDrawerToggle}>
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
                        style={
                            this.props.state.user.authenticated
                                ? { display: 'flex' }
                                : { display: 'none' }
                        }
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
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleRequestClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">You successfully logged out!</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { logOutUser }
)(withStyles(styles, { withTheme: true })(NavBar));
