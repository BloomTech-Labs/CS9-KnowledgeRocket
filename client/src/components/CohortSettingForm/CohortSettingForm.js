import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const StylizedInput = styled(Input)`
	padding: 0.5rem;
`;

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
	render() {
		return (
			<div className={this.props.className}>
				<StylizedInput
					placeholder="Class Name"
					disableUnderline={true}
					name="title"
					onChange={this.props.handleNewInput}
				/>
				<FormControlLabel
					control={
						<Checkbox
							onChange={this.props.handleCheckBox}
							name="ccEmail"
						/>
					}
					label="CC Me on Rocket Emails"
				/>
				<Button variant="contained" color="primary">
					Import CSV
				</Button>
			</div>
		);
	}
}

export default CohortSettingForm;
