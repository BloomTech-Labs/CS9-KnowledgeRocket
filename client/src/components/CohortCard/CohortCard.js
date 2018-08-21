import React from 'react';
// import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';

// function mapStateToProps(state) {
//     return {

//     };
// }

// RENDERS A COHORT CARD FOR A SINGLE CLASS - receives class info from CohortList
const CohortCard = props => {
	console.log(`PROPS ${JSON.stringify(props)}`);
	return (
		<Card className={props.className}>
			<CardContent>
				<FormControl>
					<Input>{props.cohort.title}</Input>
					<Input>Students: {props.cohort.students.length}</Input>
					<Input>Participation:</Input>
					<Input>Rockets Sent:</Input>
				</FormControl>
			</CardContent>
		</Card>
	);
};

export default CohortCard;
// export default connect(mapStateToProps)(CohortCard);
