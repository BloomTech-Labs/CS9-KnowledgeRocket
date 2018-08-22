import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

const StylizedInput = styled(Input)`
	padding: 5px;
`;

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
	render() {
		return (
			<Card className={this.props.className}>
				<StylizedInput defaultValue="Class Name" disableUnderline="true" name="className"/>
				<FormControlLabel control={<Checkbox />} label="CC Me on Rocket Emails" />
				<Button variant="contained" color="primary">
					Import CSV
				</Button>
			</Card>
		);
	}
}

export default CohortSettingForm;
