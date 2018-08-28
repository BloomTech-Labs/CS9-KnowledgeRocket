import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
// actions
import { generateBreadCrumbs } from '../../actions';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// Components
import CohortCard from '../CohortCard/CohortCard';

function mapStateToProps(state) {
  return {
    state,
  };
}

const CohortListContainer = styled.div`
  margin-left: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
`;

const CohortCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
`;

const StyledCohortCard = styled(CohortCard)`
  margin: 20px;
  width: 275px;
`;

const AddButtonCard = styled(Card)`
  margin: 20px;
  width: 275px;
  text-align: center;
`;

const StyledCardContent = styled(CardContent)`
  margin: 10px 0.5rem;
`;

const AddButtonCardTitle = styled.h3`
  display: block;
  margin-bottom: 20px;
`;

const StyledAddButtonLink = styled(Link)`
  text-decoration: none;
`;

// RENDERS A LIST OF COHORT CARDS
export class CohortList extends Component {
  state = {
    cohort: [],
  };

  componentDidMount() {
    // Checks for User to be Authenticated
    // If not authenticated it will send the user to <login/>
    // If authenticated it will set the state with the current user.
    if (!this.props.state.user.authenticated) {
      this.props.history.push('/rocket/auth');
    }
    this.props.generateBreadCrumbs(this.props.history.location.pathname);
  }

  render() {
    return (
      <CohortListContainer>
        {this.state.cohort ? (
          // user has at least one cohort, render a cohort card
          <CohortCardContainer>
            {this.props.state.user.cohorts.map((cohort, index) => (
              <StyledCohortCard key={`${index}`} cohort={cohort} {...this.props} />
            ))}
            <AddButtonCard>
              <StyledCardContent>
                <AddButtonCardTitle>New Class</AddButtonCardTitle>
                <Button variant="fab" color="primary">
                  <StyledAddButtonLink to="/rocket/classForm">
                    <AddIcon />
                  </StyledAddButtonLink>
                </Button>
              </StyledCardContent>
            </AddButtonCard>
          </CohortCardContainer>
        ) : (
          // user has 0 cohorts, render add new class btn
          <AddButtonCard>
            <StyledCardContent>
              <AddButtonCardTitle>Add a new class</AddButtonCardTitle>
              <Button variant="fab" color="primary">
                <StyledAddButtonLink to="/rocket/classForm">
                  <AddIcon />
                </StyledAddButtonLink>
              </Button>
            </StyledCardContent>
          </AddButtonCard>
        )}
      </CohortListContainer>
    );
  }
}

export default withRouter(connect(mapStateToProps, { generateBreadCrumbs })(CohortList));
