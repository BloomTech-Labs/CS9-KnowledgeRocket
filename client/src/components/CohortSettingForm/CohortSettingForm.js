import React, { Component } from 'react';
import styled from 'styled-components';
import Papa from 'papaparse';
// Material Components
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

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
		const file = event.target.files[0];
		let parsed;
		const config = {
			quoteChar: '"',
			header: true,
			preview: 0,
			complete: function(results, file) {
				parsed = results;
				console.log('Parsing complete:', results, file);
			},
		};
		if (file) {
			return Papa.parse(file, config);
		}
		console.log(parsed);
		this.setState({ csvData: parsed });
	};
	render() {
		console.log(`USER IMPORTED CSV DATA ${this.state.csvData}`);
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

export default CohortSettingForm;
