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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: flex-start;
    margin: auto auto;
    padding-top: 1rem;
`;

const ColorBlock = styled.div`
    width: 65px;
    height: 40px;
    background-color: ${props => props.bgcolor};
    border-radius: 0.25rem;
    border: 1px solid #cfcfcf;
`;
const ColorLabel = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Roboto', serif;
    width: 100%;
    height: 100%;
    text-align: center;
    font-weight: 900;
    font-size: 1rem;
    color: white;
`;

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    tr: {
        maxWidth: 150,
    },
});

let id = 0;
function createTableItem(label, participation, sent, students) {
    id += 1;
    return { id, label, participation, sent, students };
}
class RocketResult extends Component {
    state = {
        canvas: '',
        ctx: '',
        rows: [
            { id: 0, label: '', participation: '', sent: '', students: 0 },
            { id: 0, label: '', participation: '', sent: '', students: 0 },
            { id: 0, label: '', participation: '', sent: '', students: 0 },
        ],
        cohortTitle: '',
        rocketTitle: '',
        colors: ['red', 'green', 'blue', 'orange'],
    };
    componentDidMount() {
        // For Nav Bar
        this.props.generateBreadCrumbs('/rocket/results');
        const cohortId = this.props.match.params.cohortId;
        const cohortTitle = this.props.state.user.cohorts.reduce((acc, next) => {
            if (next._id === cohortId) {
                acc = next.title;
            }
            return acc;
        }, '');
        const rocketId = this.props.match.params.rocketId;
        const rocketTitle = this.props.state.user.rockets.reduce((acc, next) => {
            if (next._id === rocketId) {
                acc = next.title;
            }
            return acc;
        }, '');
        this.setState({ cohortTitle, rocketTitle });
        // Helper Function for Generating Table Items.
    }

    calculateParticipation = which => {
        const question = this.props.state.rocket.responseRockets[which];
        const { cohortId, questionId, students } = question;
        let first = 0;
        let second = 0;
        let third = 0;
        let fourth = 0;
        if (students) {
            students.forEach(st => {
                if (Number(st.answer[0].choice) === 0) first++;
                if (Number(st.answer[0].choice) === 1) second++;
                if (Number(st.answer[0].choice) === 2) third++;
                if (Number(st.answer[0].choice) === 3) fourth++;
            });
        }

        if (cohortId) {
            const cohortFromUser = this.props.state.user.cohorts.reduce((acc, next) => {
                if (next._id === cohortId) {
                    acc = next;
                }
                return acc;
            }, {});
            const totalStudentsInCohort = cohortFromUser.students.length;
            const participation = ((students.length * 100) / totalStudentsInCohort).toFixed(2);
            const sent = totalStudentsInCohort;
            return {
                participation,
                sent,
                totalStudentsInCohort,
                cohortFromUser,
                first,
                second,
                third,
                fourth,
            };
        }
        return {
            participation: 0,
            sent: 0,
            totalStudentsInCohort: 0,
            first,
            second,
            third,
            fourth,
        };
    };

    generateChart = (first, second, third, fourth) => {
        let choices = [first, second, third, fourth];
        const svgs = [];

        let sum = 0;
        for (let i = 0; i < choices.length; i++) {
            sum += choices[i];
        }
        let colors = ['red', 'green', 'blue', 'orange'];

        let cumulativePercent = 0;
        for (let i = 0; i < choices.length; i++) {
            let offset = 0;
            let percent = choices[i] === 0 ? 0 : choices[i] / sum;
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
                <path d={pathData} fill={this.state.colors[i]} className="pieChartSection" />
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
        const td = this.calculateParticipation('twoDay');
        const tw = this.calculateParticipation('twoWeek');
        const tm = this.calculateParticipation('twoMonth');
        const keys = [td, tw, tm];
        console.log('TD TW TM:', td, tw, tm);
        const rows = [
            createTableItem(
                'TWO DAY QUESTION',
                td.participation,
                td.sent,
                td.totalStudentsInCohort
            ),
            createTableItem(
                'TWO WEEK QUESTION',
                tw.participation,
                tw.sent,
                tw.totalStudentsInCohort
            ),
            createTableItem(
                'TWO MONTH QUESTION',
                tm.participation,
                tm.sent,
                tm.totalStudentsInCohort
            ),
        ];
        console.log(rows);
        return (
            <PaperHeader>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    {`${this.state.cohortTitle}: ${this.state.rocketTitle}`}
                                </TableCell>
                                <TableCell numeric>Participation</TableCell>
                                <TableCell numeric>Sent</TableCell>
                                <TableCell numeric>Students</TableCell>
                                <TableCell numeric>Legend</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.label}</TableCell>
                                        <TableCell numeric>{row.participation}%</TableCell>
                                        <TableCell numeric>{row.sent}</TableCell>
                                        <TableCell numeric>{row.students}</TableCell>
                                        <TableCell>
                                            <div
                                                name="LEGEND"
                                                style={{
                                                    display: 'inline-flex',
                                                    width: '100%',
                                                    justifyContent: 'space-evenly',
                                                }}
                                            >
                                                {this.state.colors.map((color, cidx) => {
                                                    return (
                                                        <ColorBlock
                                                            bgcolor={color}
                                                            key={`choice_${cidx}`}
                                                        >
                                                            <ColorLabel>
                                                                {`Choice: ${cidx + 1}`}
                                                            </ColorLabel>
                                                        </ColorBlock>
                                                    );
                                                })}
                                            </div>
                                            <div
                                                style={{
                                                    width: '300px',
                                                    height: '300px',
                                                    padding: '1rem',
                                                }}
                                            >
                                                {this.generateChart(
                                                    keys[idx].first,
                                                    keys[idx].second,
                                                    keys[idx].third,
                                                    keys[idx].fourth
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </PaperHeader>
        );
    }
}

export default connect(
    mapStateToProps,
    { generateBreadCrumbs }
)(withStyles(styles)(RocketResult));
