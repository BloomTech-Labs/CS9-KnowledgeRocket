import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import './ControlPanel.css';

function mapStateToProps(state) {
    return {
        state,
    };
}

const ControlPanelContainer = Styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 1rem;
    width: 10rem;
    border-radius: .4rem;
    min-height: 10rem;
`;
const CPCWithBorder = ControlPanelContainer.extend`
    border: 1px solid rgb(119, 136, 153);
    height: ${props => props.height};
`;

const CPCButton = Styled(Button)`
    border: 1px solid rgb(119, 136, 153);
    background-color: ${props => (props.warning ? 'orange' : '')} !important;
    width: 100%;
`;

const CPLink = Styled(Link)`
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
                    <CPCButton>Rockets</CPCButton>
                </CPLink>
                <CPLink to="/rocket/classes">
                    <CPCButton>Classes</CPCButton>
                </CPLink>
                <CPLink to="/rocket/billing">
                    <CPCButton>Billing</CPCButton>
                </CPLink>
                <CPLink to="/rocket/settings">
                    <CPCButton>Settings</CPCButton>
                </CPLink>
            </CPCWithBorder>
        );
    }
}

export default connect(mapStateToProps)(ControlPanel);
