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

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
	handleFileSelect = e => {
		console.log('MADE IT TO FILE SELECT');
		const file = e.target.files[0];
		console.log(`FILE ${file}`);
		const config = {
			quoteChar: '"',
			header: true,
			preview: 0,
			complete: function(results, file) {
				const data = results;
				console.log('Parsing complete:', results, file);
			},
		};
		Papa.parse(file, config);
	};
	render() {
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

				<input type="file" id="csv-file" name="files" onClick={this.handleFileSelect} />
			</Card>
		);
	}
}

export default CohortSettingForm;
