import React, { Component } from 'react';
// import { connect } from 'react-redux';
// Material Components
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';

// function mapStateToProps(state) {
//     return {

//     };
// }

// RENDERS A COHORT CARD FOR A SINGLE CLASS - receives class info from CohortList
class CohortCard extends Component {
	render() {
		// each card renders:
		// Cohort name
		// Number of students
		// Participation(%)
		// Rockets sent
		return (
			<CardContent>
				<FormControl>
					<Input>Name:</Input>
					<Input>Number of Students:</Input>
					<Input>Participation:</Input>
					<Input>Rockets Sent:</Input>
				</FormControl>
			</CardContent>
		);
	}
}

export default CohortCard;
// export default connect(mapStateToProps)(CohortCard);
