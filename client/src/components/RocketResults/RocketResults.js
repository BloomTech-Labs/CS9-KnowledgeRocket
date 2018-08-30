import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { generateBreadCrumbs } from '../../actions';
import './RocketResults.css';
import styled from 'styled-components';

function mapStateToProps(state) {
    return {
        state,
    };
}
const PaperHeader = styled.div`
    display: flex, justify;
`;

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
class RocketResult extends Component {
    state = { canvas: '', ctx: '' };
    componentDidMount() {
        this.props.generateBreadCrumbs('/rocket/results');

        // this.setState({
        //     canvas,
        //     ctx,
        // });
        // this.piChart();
    }
    // piChart = () => {
    //     //  ctx.arc(200 + offsetX, 200 + offsetY, 120(dont forget the offset), beginAngle, endAngle);
    //     let choices = [22, 33, 12, 35];
    //     let canvas = this.refs.canvas;
    //     let ctx = canvas.getContext('2d');
    //     let sum = 0;
    //     for (let i = 0; i < choices.length; i++) {
    //         sum += choices[i];
    //     }
    //     let colors = ['red', 'green', 'blue', 'orange'];
    //     let bias = 0.15;
    //     let offset = 8;
    //     let beginAngle = 0;
    //     let endAngle = 0;
    //     let offsetX, offsetY, medianAngle;
    //     for (let i = 0; i < choices.length; i++) {
    //         //Converting to radians aka percentages of 2
    //         let radians = Math.PI * ((choices[i] / sum) * 2);
    //         beginAngle = endAngle + bias;
    //         endAngle = endAngle + radians;
    //         medianAngle = (endAngle + beginAngle) / 2;
    //         offsetX = Math.cos(medianAngle) * offset;
    //         offsetY = Math.sin(medianAngle) * offset;
    //         ctx.beginPath();
    //         ctx.fillStyle = colors[i % colors.length];
    //         ctx.moveTo(200 + offsetX, 200 + offsetY);
    //         ctx.arc(200, 200, 60 + offset * 2, beginAngle, endAngle);
    //         ctx.lineTo(200 + offsetX, 200 + offsetY);
    //         ctx.stroke();
    //         ctx.fill();
    //     }
    //     ctx.fillstyle = 'white';
    // };

    generateChart = () => {
        const svgs = [];
        let choices = [22, 33, 12, 35];
        let sum = 0;
        for (let i = 0; i < choices.length; i++) {
            sum += choices[i];
        }
        let colors = ['red', 'green', 'blue', 'orange'];
        // let bias = 0.15;
        // let offset = 8;
        // let beginAngle = 0;
        // let endAngle = 0;
        // let offsetX, offsetY, medianAngle;

        let cumulativePercent = 0;
        for (let i = 0; i < choices.length; i++) {
            //Converting to radians aka percentages of 2
            let offset = 0;
            let percent = choices[i] / sum;
            const startX = Math.cos(2 * Math.PI * (cumulativePercent + offset));
            const startY = Math.sin(2 * Math.PI * (cumulativePercent + offset));
            cumulativePercent += percent;
            const endX = Math.cos(2 * Math.PI * cumulativePercent);
            const endY = Math.sin(2 * Math.PI * cumulativePercent);
            const largeArcFlag = percent > 0.5 ? 1 : 0;
            const pathData = [
                `M 0 0`,
                `L ${startX} ${startY}`,
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0`, // Line
            ].join(' ');
            svgs.push(
                <path d={pathData} fill={colors[i % colors.length]} className="pieChartSection" />
            );
        }

        return (
            // SVG VIEWBOX 1:2 ratio -1 -1 2 2 were originals
            <svg
                viewBox="-1.5 -1.5 3 3"
                style={{ transform: 'rotate(-0.25turn)' }}
                space="preserve"
            >
                {svgs.map(each => {
                    return each;
                })}
            </svg>
        );
    };
    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Some Name for this Data likely a template literal
                                </TableCell>
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
                <Paper>
                    <div style={{ width: '300px', height: '300px', padding: '1rem' }}>
                        {this.generateChart()}
                    </div>
                </Paper>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(withStyles(styles)(RocketResult));
