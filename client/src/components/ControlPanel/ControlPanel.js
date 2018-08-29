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
        height: 'inherit',
    },
    drawerPaper: {
        zIndex: '10',
        position: 'fixed',
        padding: '8rem 0 0 0',
        backgroundColor: 'var(--grayRedBlue_background)',
        overflow: 'hidden',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

export const CPCButton = styled(Button)`
    color: var(--grayRedBlue_background) !important;
    border: 1px solid rgb(119, 136, 153);
    background-color: var(--grayRedBlue_nav) !important;
    width: 100%;
    margin-bottom: 1rem !important;
`;

const CPLink = styled(Link)`
    text-decoration: none;
    width: 100%;
`;

class ControlPanel extends Component {
    state = {

    };

    componentDidMount() {
        this.updateDimensions();
    }

    render() {
        const { classes } = this.props;

        return (
            <div style={{height: '100vh', padding: '7rem 0 0 0'}}>
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
            </div>
        );
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ControlPanel));
