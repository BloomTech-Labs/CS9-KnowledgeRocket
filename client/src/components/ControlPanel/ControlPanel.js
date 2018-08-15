import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './index.css'

function mapStateToProps(state) {
    return {

    };
}

class ControlPanel extends Component {
    render() {
        return (
            <div className='ControlPanel_container'>
                <Button><Link to='/rocket'>Rockets</Link></Button>
                <Button><Link to='/rocket/classes'>Classes</Link></Button>
                <Button><Link to='/rocket/billing'>Billing</Link></Button>
                <Button><Link to='/rocket/settings'>Settings</Link></Button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ControlPanel);