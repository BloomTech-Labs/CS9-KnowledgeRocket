import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Material Components
import { Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StyledControlPanel = styled(Drawer)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    width: 10rem;
    border-radius: 0.4rem;
    min-height: 10rem;
    height: ${props => props.height};
    background-color: #0088cc;
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

class ControlPanel extends Component {
    state = {
        height: '0px',
    };
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this));
    }

    updateDimensions = () => {
        if (window.windowState === 1) {
            this.setState({ height: window.innerHeight - 88 + 'px' });
        } else {
            this.setState({ height: document.documentElement.clientHeight - 88 + 'px' });
        }
    };
    render() {
        return (
            <CPCWithBorder height={this.state.height}>
                <CPLink to="/rocket">
                    <CPCButton variant="outlined">Rockets</CPCButton>
                </CPLink>
                <CPLink to="/rocket/classes">
                    <CPCButton variant="outlined">Classes</CPCButton>
                </CPLink>
                <CPLink to="/rocket/billing">
                    <CPCButton variant="outlined">Billing</CPCButton>
                </CPLink>
                <CPLink to="/rocket/settings">
                    <CPCButton variant="outlined">Settings</CPCButton>
                </CPLink>
            </CPCWithBorder>
        );
    }
}

export default connect(mapStateToProps)(ControlPanel);
