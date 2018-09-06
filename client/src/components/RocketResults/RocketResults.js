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
    font-size: 1rem !important;
    user-select: none !important;
`;

const ColorBlock = styled.div`
    width: 65px;
    height: 40px;
    background-color: ${props => props.bgcolor};
    border-radius: 0.25rem;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
        0px 3px 1px -2px rgba(0, 0, 0, 0.12);
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
    color: black;
`;

const StyledTableCell = styled(TableCell)`
    justify-content: center !important;
    text-align: center !important;
    font-size: 1.5rem !important;
    font-weight: bold !important;
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
        colors: ['#1B75BB', '#FFC628', '#74A752', '#F50057'],
        totalStudents: 0,
        cohort: { students: [] },
        twoDaySchedule: '00/00/00',
        twoWeekSchedule: '00/00/00',
        twoMonthSchedule: '00/00/00',
    };
    componentDidMount() {
        // For Nav Bar
        this.props.generateBreadCrumbs('/rocket/classes');
        const cohortId = this.props.match.params.cohortId;
        let cohortTitle = '';
        let totalStudents = 0;
        let cohort = { students: [] };
        const rocketId = this.props.match.params.rocketId;
        let twoDaySchedule = '00/00/00';
        let twoWeekSchedule = '00/00/00';
        let twoMonthSchedule = '00/00/00';

        // Find the right cohort and set data on state.
        this.props.state.user.cohorts.forEach(item => {
            if (item._id === cohortId) {
                cohortTitle = item.title;
                totalStudents = item.students.length;
                cohort = item;
            }
        });

        const rocketTitle = this.props.state.user.rockets.reduce((acc, next) => {
            if (next._id === rocketId) {
                acc = next.title;
            }
            return acc;
        }, '');

        // Set scheduled dates for TD TW TM on state
        cohort.rockets.forEach((cr, idx) => {
            if (cr.rocketId._id === rocketId) {
                twoDaySchedule = cr.td;
                twoWeekSchedule = cr.tm;
                twoMonthSchedule = cr.tw;
            }
        });
        this.setState({
            cohortTitle,
            rocketTitle,
            totalStudents,
            cohort,
            twoDaySchedule,
            twoWeekSchedule,
            twoMonthSchedule,
        });
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
                if (st.answer[0].choice === 0) first++;
                if (st.answer[0].choice === 1) second++;
                if (st.answer[0].choice === 2) third++;
                if (st.answer[0].choice === 3) fourth++;
            });
        }
        const totalStudentsInCohort = this.state.cohort.students.length;
        console.log(`FOR COHORT: ${this.state.cohortTitle}\ntwoDaySchedule: ${this.state.twoDaySchedule}\ntwoWeekSchedule: ${this.state.twoWeekSchedule}\ntwoMonthSchedule: ${this.state.twoMonthSchedule}`)
        let sent = 0;
        if (which === 'twoDay' && Date.now() > Date.parse(this.state.twoDaySchedule)) {
            console.log(`FOR TwoDay\ntwoDaySchedule: ${Date.parse(this.state.twoDaySchedule)}\ntoday's Date: ${Date.now()}\nIs Today Newer? ${Date.now() > Date.parse(this.state.twoDaySchedule)}`)
            sent = totalStudentsInCohort;
            console.log(`THE VALUE OF SENT IS NOW: ${sent}`)
        }
        if (which === 'twoWeek' && Date.now() > Date.parse(this.state.twoWeekSchedule)) {
            sent = totalStudentsInCohort;
        }
        if (which === 'twoMonth' && Date.now() > Date.parse(this.state.twoMonthSchedule)) {
            sent = totalStudentsInCohort;
        }
        console.log(`THE VALUE OF SENT CHANGED NOW?: ${sent}`)
        if (cohortId) {
            const participation = ((students.length * 100) / totalStudentsInCohort).toFixed(2);
            // Check if questions should have been sent by now, and set sent to number of students if so.

            return {
                participation,
                sent,
                totalStudentsInCohort,
                first,
                second,
                third,
                fourth,
                questionId,
            };
        }
        return {
            participation: 0,
            sent: 0,
            totalStudentsInCohort,
            first,
            second,
            third,
            fourth,
            questionId,
        };
    };

    generateChart = (first, second, third, fourth, questionId) => {
        let choices = [first, second, third, fourth];
        const svgs = [];

        let sum = 0;
        for (let i = 0; i < choices.length; i++) {
            sum += choices[i];
        }

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
                <path
                    d={pathData}
                    fill={this.state.colors[i]}
                    className="pieChartSection"
                    key={`${questionId}_${i}`}
                />
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
        return (
            <PaperHeader>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    {`${this.state.cohortTitle}: ${this.state.rocketTitle}`}
                                </StyledTableCell>
                                <StyledTableCell numeric>Participation</StyledTableCell>
                                <StyledTableCell numeric>Sent</StyledTableCell>
                                <StyledTableCell numeric>Students</StyledTableCell>
                                <StyledTableCell numeric>Legend</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => {
                                return (
                                    <TableRow key={row.id}>
                                        <StyledTableCell>{row.label}</StyledTableCell>
                                        <StyledTableCell numeric>
                                            {row.participation}%
                                        </StyledTableCell>
                                        <StyledTableCell numeric>{row.sent}</StyledTableCell>
                                        <StyledTableCell numeric>{row.students}</StyledTableCell>
                                        <StyledTableCell>
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
                                                    keys[idx].fourth,
                                                    keys[idx].questionId
                                                )}
                                            </div>
                                        </StyledTableCell>
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
