import React from 'react';
import styled from 'styled-components';

const StyledSection = styled.section`
	background-color: #5b7383;
	font-size: 1rem;
	letter-spacing: 0.1rem;
	padding: 15px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	backface-visibility: hidden;
	text-align: center;
	transform-style: preserve-3d;
	transform: rotateX(180deg);
	h2 {
		color: #39d1b4;
	}
	h3 {
		color: white;
	}
`;

const AuthBackside = props => {
	return (
		<StyledSection>
			{props.message === 'failed'
				? [
						<h2>Oops.</h2>,
						<br />,
						<h3>Your log in failed. Please check your username and password.</h3>,
				  ]
				: props.message === 'loggingIn'
					? [<h2>Please wait.</h2>, <br />, <h3>We are logging you in.</h3>]
					: props.message === 'addingUser'
						? [<h2>Please wait.</h2>, <br />, <h3>We are creating your account.</h3>]
						: null}
		</StyledSection>
	);
};

export default AuthBackside;
