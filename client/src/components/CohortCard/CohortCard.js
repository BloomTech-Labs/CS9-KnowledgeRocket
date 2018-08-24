import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';

const StyledLink = styled(Link)`
	text-decoration: none;
`;

// RENDERS A COHORT CARD FOR A SINGLE CLASS - receives class info from CohortList
const CohortCard = props => {
	return (
		<Card className={props.className}>
			<CardContent>
				<FormControl>
					<Input>
						<StyledLink to={{ pathname: '/rocket/classForm', state: props.cohort._id }}>
							{props.cohort.title}
						</StyledLink>
					</Input>
					<Input>
						Students:{' '}
						{typeof props.cohort.students.length === 'object' ? props.cohort.students.length : 0}
					</Input>
					<Input>Participation:</Input>
					<Input>Rockets Sent:</Input>
				</FormControl>
			</CardContent>
		</Card>
	);
};

export default CohortCard;
