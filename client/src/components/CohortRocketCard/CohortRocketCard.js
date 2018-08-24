import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

const StylizedRocket = styled(Card)`
	width: 250px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding: 20px;
	margin: 10px;
`;

const StylizedCohorts = styled.div`
	text-align: left;
	margin: 10px auto;
`;

class CohortRocketCard extends Component {
	render() {
		return (
			<StylizedRocket>
				<CardContent>
					<p>ROCKET TITLE</p>
					<StylizedCohorts>
						<p>Cohort 1</p>
						<p>Cohort 2</p>
						<p>Cohort 3</p>
					</StylizedCohorts>
					<TextField
						id="date"
						label="Birthday"
						type="date"
						defaultValue="2017-05-24"
						// className={classes.textField}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</CardContent>
			</StylizedRocket>
		);
	}
}

export default CohortRocketCard;
