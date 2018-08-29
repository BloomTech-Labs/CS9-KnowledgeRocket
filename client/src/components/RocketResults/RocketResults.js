import React, { Component } from 'react';
import { generateBreadCrumbs } from '../../actions';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function mapStateToProps(state) {
    return {
        state,
    };
}
class RocketResult extends Component {
    componentDidMount() {}
    render() {
        return <div />;
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(RocketResult);
