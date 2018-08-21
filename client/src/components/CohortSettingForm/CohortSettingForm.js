import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

// const CohortSettingForm = styled(Paper)`
// 	border: 1px solid red;
// 	width: 1000px;
// 	height: 200px;
// `;

// <Paper>
// 	<Card>
// 		<h1>DDDDD</h1>
// 	</Card>
// </Paper>;

// CONTAINS SETTINGS: CLASS NAME, CC CHECKBOX, IMPORT CSV
class CohortSettingForm extends Component {
	render() {
		return <h1 className={this.props.className}>Settings</h1>;
	}
}

export default CohortSettingForm;
