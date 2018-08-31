import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
// Material Components
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Button from '@material-ui/core/Button';
// Actions
import { importCSV } from '../../actions/';

function mapStateToProps(state) {
    return {
        state,
    };
}

const StylizedInput = styled(Input)`
    padding: 0.5rem;
    min-width: 20rem;
    background-color: #f2f7ff;
    border-radius: 0.25rem;
    order: 0;
`;

const StylizedForm = styled.form`
    border-radius: 0.25rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

const StylizedCSVInput = styled.input`
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    opacity: 0;
    z-index: -10;
    height: 0.1px;
`;

const StyledLabel = styled.label`
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
    justify-content: center;
    color: white;
    background-color: #3f51b5;
    border-radius: 0.25rem;
    padding: 1rem;
    order: 1;
    box-shadow: 0px 1px 3px 0px rgba(15, 12, 12, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14),
        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
    &:hover {
        background-color: #303f9f;
    }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    order: 2;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
`;

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
    state = {
        csvData: [],
    };

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
    render() {
        // console.log(`USER IMPORTED CSV DATA ${JSON.stringify(this.state.csvData)}`);

        return (
            <div className={this.props.className}>
                <StylizedInput
                    placeholder="Class Name"
                    disableUnderline={true}
                    name="title"
                    onChange={this.props.handleNewInput}
                    value={this.props.title === '' ? null : this.props.title}
                />
                <StylizedForm>
                    <StyledLabel for="csv-file">Import CSV</StyledLabel>
                    <StylizedCSVInput
                        type="file"
                        id="csv-file"
                        name="files"
                        onChange={this.handleFileSelect}
                    />
                </StylizedForm>
                <StyledFormControlLabel
                    control={<Checkbox onChange={this.props.handleCheckBox} name="ccEmail" />}
                    label="CC Me on Rocket Emails"
                />
                {/* 
				<Button variant="contained" color="primary">
					Import CSV
				</Button> */}
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
