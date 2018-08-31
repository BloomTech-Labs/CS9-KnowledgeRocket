import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledSection = styled.section`
	background-color: #5b7383;
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
`;

const AuthBackside = props => {
	return (
		<StyledSection>
			<h2>Merci!</h2>
			<br />
			<h3>Votre compte a été créé avec succès.</h3>
		</StyledSection>
	);
};

export default AuthBackside;
