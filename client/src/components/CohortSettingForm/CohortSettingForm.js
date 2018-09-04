import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
// Material Components
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
// Actions
import { importCSV } from '../../actions/';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedInput = styled(Input)`
    margin: 0 1rem 1rem 0rem !important;
    padding: 0.5rem;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    order: 0;
    flex-grow: 12;
`;

const StylizedForm = styled.form`
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    order: 3;
`;

const StylizedCSVInput = styled.input`
    margin: 0 1rem 1rem 0rem !important;
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    opacity: 0;
    z-index: -10;
    height: 0.1px;
`;

const StyledCSVLabelButton = styled.label`
    margin: 0 1rem 1rem 0rem !important;
    font-size: 0.875rem;
    min-width: 64px;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    min-height: 36px;
    box-sizing: border-box;
    line-height: 1.4em;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 500;
    border-radius: 4px;

    text-transform: uppercase;
    display: flex;
    justify-content: center;
    color: white;
    background-color: #3f51b5;
    padding: 1rem;
    box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    &:hover {
        background-color: #303f9f;
    }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    margin: 0 1rem 1rem 0rem !important;
    order: 2;
`;

const StyledButton = styled(Button)`
    margin: 0 1rem 1rem 0rem !important;
    padding: 1rem !important;
    order: 4;
`;

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
    state = {
        csvData: [],
        cohort: {
            cc: false,
            rockets: { _id: '', rocketId: '', startDate: '', td: '', tw: '', tm: '' },
            students: [{}],
            title: '',
            _id: '',
        },
    };

    componentDidMount() {
        let cohort = this.props.state.user.cohorts[this.props.cohortIDX];
        this.setState({ cohort });
    }

    handleFileSelect = event => {
        const teacherID = this.props.state.user._id;
        const cohortID = this.props.cohortID;
        let studentData;

        const file = event.target.files[0];
        const config = {
            quoteChar: '"',
            header: true,
            preview: 0,
            complete: (results, file) => {
                studentData = results.data;
                this.props.importCSV(teacherID, cohortID, studentData);
                this.setState({ csvData: results });
            },
        };
        if (file) {
            return Papa.parse(file, config);
        }
    };

    handleCheckBox = () => {
        this.setState({ cohort: { ...this.state.cohort, cc: !this.state.cohort.cc } });
    };

    handleNewInput = e => {
        this.setState({ cohort: { ...this.state.cohort, [e.target.name]: e.target.value } });
    };

    handleAddCohort = () => {
        const cohort = {
            title: this.state.cohort.title,
            cc: this.state.cohort.cc,
        };
        if (this.state.cohort._id !== '') {
            cohort._id = this.state.cohort._id;
        }
        this.props.addCohort(cohort, this.props.state.user._id);
    };

    render() {
        console.log('CC Email',this.state.cohort.cc)
        return (
            <div className={this.props.className}>
                <StylizedInput
                    disableUnderline={true}
                    name="title"
                    onChange={this.handleNewInput}
                    onBlur={this.handleNewInput}
                    placeholder={
                        this.state.cohort.title === '' ? 'Class Name' : this.state.cohort.title
                    }
                />
                <StylizedForm>
                    <StyledCSVLabelButton htmlFor={'csv-file'}>IMPORT CSV</StyledCSVLabelButton>
                    <StylizedCSVInput
                        type="file"
                        id="csv-file"
                        name="files"
                        onChange={this.handleFileSelect}
                    />
                </StylizedForm>
                <StyledFormControlLabel
                    control={
                        this.props.state.user.cohorts[this.props.cohortIDX].cc ? (
                            <Checkbox onChange={this.handleCheckBox} name="ccEmail" checked/>
                        ) : (
                            <Checkbox onChange={this.handleCheckBox} name="ccEmail" />
                        )
                    }
                    label="CC Me on Rocket Emails"
                />
                <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={this.handleAddCohort}
                    style={{ order: '4' }}
                >
                    Add / Edit Class
                </StyledButton>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    {
        importCSV,
    }
)(CohortSettingForm);
