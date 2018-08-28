import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Material Components
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function mapStateToProps(state) {
    return {
        state,
    };
}

// custom material theme - overrides default styles/injected with withStyles HOC
const styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        // height: 'inherit',
    },
    drawerPaper: {
        borderRadius: '0.5rem',
        position: 'static',
        width: 150,
        backgroundColor: '#3f51b5',
        // height: 'inherit',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

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

class ControlPanel extends Component {
    state = {
        height: '0px',
    };

    // componentDidMount() {
    //     this.updateDimensions();
    //     window.addEventListener('resize', this.updateDimensions.bind(this));
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.updateDimensions.bind(this));
    // }

    // updateDimensions = () => {
    //     const bias = 132;
    //     if (window.windowState === 1) {
    //         this.setState({ height: window.innerHeight - bias + 'px' });
    //     } else {
    //         this.setState({ height: document.documentElement.clientHeight - bias + 'px' });
    //     }
    // };

    render() {
        const { classes } = this.props;
        {
            /* <div style={{ height: this.state.height, backgroundColor: '#3f51b5' }}> */
        }
        return (
            <Drawer
                variant="permanent"
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
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ControlPanel));
