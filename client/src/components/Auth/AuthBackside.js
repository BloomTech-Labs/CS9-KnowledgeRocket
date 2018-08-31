import React, { Component } from 'react';
import { connect } from 'react-redux';
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
`;

const AuthBackside = props => {
	return (
		<StyledSection>
			<h2>Thank You!</h2>
			<br />
			<h3 style={{ color: 'white' }}>Your account was created successfully</h3>
		</StyledSection>
	);
};

export default AuthBackside;
