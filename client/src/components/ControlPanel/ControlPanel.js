import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import './ControlPanel.css'; 
=======
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import './ControlPanel.css';
>>>>>>> af017641af90856cb20b40fb067aab776ecfa54b

function mapStateToProps(state) {
    return {
        state
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
    height: 70vh;
    min-height: 10rem;
`
const CPCWithBorder = ControlPanelContainer.extend`
    border: 1px solid rgb(119, 136, 153);
`

const CPCButton = Styled(Button)`
    border: 1px solid rgb(119, 136, 153);
    background-color: ${props=>props.warning ? 'orange' : ''} !important;
`
class ControlPanel extends Component {
    render() {
        return (
<<<<<<< HEAD
            <div className='box4cp'>
                <a className="bobsize" href="">Rockets</a>
                <a className="bobsize" href="">Classes</a>
                <a className="bobsize" href="">Billing</a>
                <a className="bobsize" href="">Settings</a>
            </div>
=======
            <CPCWithBorder>
                <CPCButton><Link to='/rocket'>Rockets</Link></CPCButton>
                <CPCButton><Link to='/rocket/classes'>Classes</Link></CPCButton>
                <CPCButton><Link to='/rocket/billing'>Billing</Link></CPCButton>
                <CPCButton><Link to='/rocket/settings'>Settings</Link></CPCButton>
            </CPCWithBorder>
>>>>>>> af017641af90856cb20b40fb067aab776ecfa54b
        );
    }
}

export default connect(
    mapStateToProps,
)(ControlPanel);