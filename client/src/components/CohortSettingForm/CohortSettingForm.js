import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Papa from 'papaparse';
// Material Components
import Card from '@material-ui/core/Card';
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
	padding: 0.5rem;
`;

const StylizedForm = styled.form`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const StylizedCSVInput = styled.input`
	display: inline-block;
	margin: 0 10px;
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
				console.log('Parsing complete:', results, file);
				studentData = results;
				this.props.importCSV(results);
				this.setState({ csvData: results });
			},
		};
		if (file) {
			return Papa.parse(file, config);
		}
	};
	render() {
		console.log(`USER IMPORTED CSV DATA ${JSON.stringify(this.state.csvData)}`);
		console.log(`PROPS ${JSON.stringify(this.props)}`);
		return (
			<Card className={this.props.className}>
				<StylizedInput
					placeholder="Class Name"
					disableUnderline={true}
					name="title"
					onChange={this.props.handleNewInput}
				/>
				<FormControlLabel
					control={<Checkbox onChange={this.props.handleCheckBox} name="ccEmail" />}
					label="CC Me on Rocket Emails"
				/>
				{/* 
				<Button variant="contained" color="primary">
					Import CSV
				</Button> */}
				<StylizedForm>
					<label for="csv-file">Import CSV</label>
					<StylizedCSVInput
						type="file"
						id="csv-file"
						name="files"
						onChange={this.handleFileSelect}
					/>
				</StylizedForm>
			</Card>
		);
	}
}

export default connect(mapStateToProps, {
	importCSV,
})(CohortSettingForm);
