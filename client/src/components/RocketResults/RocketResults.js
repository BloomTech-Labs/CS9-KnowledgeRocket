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
let id = 0;
function createGraph(label, participation, sent, students) {
    id += 1;
    return { id, label, participation, sent, students };
}
const rows = [createGraph('SAY MY NAME', 100, 83, 83), createGraph('John Cena', 10, 83, 83)];
class RocketResult extends Component {
    componentDidMount() {}
    render() {
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>f</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell>{row.name}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(RocketResult);
