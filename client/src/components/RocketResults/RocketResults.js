import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});
let id = 0;
function createGraph(label, participation, sent, students) {
    id += 1;
    return { id, label, participation, sent, students };
}
const rows = [
    createGraph('TWODAY TEST QUESTION', 100, 83, 83),
    createGraph('TWO WEEK TEST QUESTION', 10, 83, 83),
    createGraph('TWO MONTH TEST QUESTION', 99, 83, 83),
];
function RocketResult() {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Some Name for this Data likely a template literal</TableCell>
                        <TableCell numeric>Participation</TableCell>
                        <TableCell numeric>Sent</TableCell>
                        <TableCell numeric>Students</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.label}</TableCell>
                                <TableCell numeric>{row.participation}%</TableCell>
                                <TableCell numeric>{row.sent}</TableCell>
                                <TableCell numeric>{row.students}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default withStyles(styles)(RocketResult);
