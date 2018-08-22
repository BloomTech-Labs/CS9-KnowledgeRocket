import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortRocketCard from '../CohortRocketCard/CohortRocketCard';

class CohortRocketList extends Component {
	// state={};

	render() {
		return (
			<div className={this.props.className}>
				{/* Render all rockets added */}
				<CohortRocketCard />
				<CohortRocketCard />
				<CohortRocketCard />
			</div>
		);
	}
}

export default CohortRocketList;
