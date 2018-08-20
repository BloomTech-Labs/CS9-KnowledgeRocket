import React, { Component } from 'react';
import styled from 'styled-components';
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
    cohorts: [{}],
  };

  // pull cohort list for a user from state this.props.state.user.cohorts
  componentDidMount() {
    // Checks for User to be Authenticated
    // If not authenticated it will send the user to <login/>
    // If authenticated it will set the state with the current user.
    // if (!this.props.state.user.authenticated) {
    //     this.props.history.push('/rocket/auth');
    // }
  }
  render() {
    return (
      <CohortListContainer>
        {this.state.cohorts.length > 0
          ? [
              <Card key={1}>
                <CohortCard />
              </Card>,
              <Card key={2}>
                <CohortCard />
              </Card>,
              <Card key={3}>
                <CohortCard />
              </Card>,
              <Card key={4}>
                <CohortCard />
              </Card>,
              <Card className="AddButtonCard" key={5}>
                <StyledCardContent>
                  <p>New Class</p>
                  <Button variant="fab" color="primary">
                    <AddIcon />
                  </Button>
                </StyledCardContent>
              </Card>,
            ]
          : [
              <Card>
                <StyledCardContent>
                  <p>Add a new class</p>
                  <Button variant="fab" color="primary">
                    <AddIcon />
                  </Button>
                </StyledCardContent>
              </Card>,
            ]}
      </CohortListContainer>
    );
  }
}

// export default connect(mapStateToProps)(CohortList);
export default CohortList;
