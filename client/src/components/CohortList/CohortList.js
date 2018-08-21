import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { connect } from 'react-redux';
// Material Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
// Components
import CohortCard from '../CohortCard/CohortCard';

const CohortListContainer = styled.div`
  margin-left: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  border: 1px solid rgb(119, 136, 153);
  border-radius: 0.4rem;
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
`;

const AddButtonCard = styled(Card)`
  margin: 20px;
  width: 150px;
  text-align: center;
`;

const StyledCardContent = styled(CardContent)`
  margin: 10px 0.5rem;
`;

const AddButtonCardTitle = styled.h3`
  display: block;
  margin-bottom: 20px;
`;

// RENDERS A LIST OF COHORT CARDS
class CohortList extends Component {
  state = {
    cohort: [],
  };

  componentDidMount() {
    this.fetchCohortData();
  }

  fetchCohortData = () => {
    // FETCH COHORT DATA FOR A USER FROM SERVER
    axios
      .get('http://localhost:5000/api/cohort')
      .then(response => {
        this.setState(() => ({ cohort: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
  };

  render() {
    // console.log(`STATE ${JSON.stringify(this.state.cohort)}`);

    return (
      <CohortListContainer>
        {this.state.cohort.length > 0 ? (
          // user has at least one cohort, render a cohort card
          <CohortCardContainer>
            {this.state.cohort.map((cohort, index) => (
              <StyledCohortCard key={`${cohort.students[index]}`} cohort={cohort} />
            ))}
            <AddButtonCard>
              <StyledCardContent>
                <AddButtonCardTitle>New Class</AddButtonCardTitle>
                <Button variant="fab" color="primary">
                  <AddIcon />
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
                <AddIcon />
              </Button>
            </StyledCardContent>
          </AddButtonCard>
        )}
      </CohortListContainer>
    );
  }
}

// export default connect(mapStateToProps)(CohortList);
export default CohortList;
