import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, SvgIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { logOutUser } from '../../actions';
import './index.css';

function mapStateToProps(state) {
    return {
        state
    };
}

class NavBar extends Component {
    state = {
        labels: ['Home'],
        paths: ['/']
    }
    componentDidMount() {
        if (!this.props.state.user.authenticated) {
            this.props.history.push('/rocket/auth');
        }
        this.generateBreadCrumbs()
    }

    handleLogOut = () => {
        this.props.logOutUser();
        this.props.history.push('/rocket/auth')
    }

    generateBreadCrumbs = () => {
        let path = this.props.history.location.pathname
        const crumbs = path.split('/')
        const currentLabels = [...this.state.labels];
        const currentPaths = [...this.state.paths];
        crumbs.forEach(item => {
            // Uppercase first letter of each item before adding them to the breadcrumbs path.
            if (item !== '') {
                const label = item.charAt(0).toUpperCase() + item.slice(1) + '';
                currentLabels.push(label);
            }
        })
        // Generate The BreadCrumbs Path from the history.location.pathname
        // Excluding the very last path, because it will be the current location.
        for (let i = 0; i < crumbs.length - 1; i++) {
            if (crumbs[i] !== '') currentPaths.push(crumbs[i]);            
        }
        // Push the current location last into the currentPaths Array
        currentPaths.push(this.props.history.location.pathname)
        this.setState({ labels: currentLabels, paths: currentPaths })
    }

    render() {
        console.log(this.state.paths)
        return (
            <div className='NavBar_container'>
                <div className='NavBar_breadcrumbs'>
                    {this.state.labels.map((item, index) => {
                        return (
                            <div className='NavBar_breadcrumb' key={item + index}>
                                <Link to={this.state.paths[index]} >
                                    <Button> {item} </Button>
                                </Link>
                                <SvgIcon color='primary'>
                                    <path d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                                </SvgIcon>
                            </div>
                        );
                    })}
                </div>
                <Button onClick={this.handleLogOut} variant="contained" color="secondary">Sign-Out</Button>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, { logOutUser }
)(NavBar);