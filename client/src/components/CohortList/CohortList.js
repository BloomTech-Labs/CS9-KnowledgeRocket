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

// function mapStateToProps(state) {
//     return {
//         state,
//     };
// }

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

const StyledCardContent = styled(CardContent)`
  margin: 10px 0.5rem;
`;

// RENDERS A LIST OF COHORT CARDS
class CohortList extends Component {
  state = {
    cohort: {},
  };

  componentDidMount() {
    // Checks for User to be Authenticated
    // If not authenticated it will send the user to <login/>
    // If authenticated it will set the state with the current user.
    // if (!this.props.state.user.authenticated) {
    //     this.props.history.push('/rocket/auth');
    // }
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
    console.log(`STATE ${JSON.stringify(this.state.cohort)}`);

    return (
      <CohortListContainer>
        {this.state.cohort ? (
          // user has at least one cohort, render a cohort card
          <Card className="AddButtonCard" key={5}>
            <StyledCardContent>
              <p>New Class</p>
              <Button variant="fab" color="primary">
                <AddIcon />
              </Button>
            </StyledCardContent>
          </Card>
        ) : (
          // user has 0 cohorts, render add new class btn
          [
            <Card>
              <StyledCardContent>
                <p>Add a new class</p>
                <Button variant="fab" color="primary">
                  <AddIcon />
                </Button>
              </StyledCardContent>
            </Card>,
          ]
        )}
      </CohortListContainer>
    );
  }
}

// export default connect(mapStateToProps)(CohortList);
export default CohortList;
