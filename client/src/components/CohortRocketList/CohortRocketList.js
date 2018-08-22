import React, { Component } from 'react';
import styled from 'styled-components';
// Material Components
import Card from '@material-ui/core/Card';
// Components
import CohortRocketCard from '@material-ui/core/CohortRocketCard';

class CohortRocketList extends Component {
	// state={};

	render() {
		return <Card className={this.props.className}>{/* Render all rockets added */}</Card>;
	}
}

export default CohortRocketList;
