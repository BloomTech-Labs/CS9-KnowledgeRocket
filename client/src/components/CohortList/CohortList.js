import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter /*Link*/ } from 'react-router-dom';
// actions
import { generateBreadCrumbs } from '../../actions';
// Material Components
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';
// Components
// import CohortCard from '../CohortCard/CohortCard';
import { FloatingAdd, ListCard /*RocketListContainer*/ } from '../RocketList/ListElements';

function mapStateToProps(state) {
    return {
        state,
    };
}

// const CohortListContainer = styled.div`
//   margin-left: 1rem;
//   padding: 1rem;
//   display: flex;
//   flex-direction: row;
//   align-items: flex-start;
//   justify-content: space-around;
//   width: 100%;
//   border-radius: 0.4rem;
// `;

const CohortCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`;

// const StyledCohortCard = styled(CohortCard)`
//     margin: 20px;
// `;

// const AddButtonCard = styled(Card)`
//     margin: 20px;
//     width: 150px;
//     text-align: center;
// `;

// const StyledCardContent = styled(CardContent)`
//     margin: 10px 0.5rem;
// `;

// const AddButtonCardTitle = styled.h3`
//     display: block;
//     margin-bottom: 20px;
// `;

// const StyledAddButtonLink = styled(Link)`
//     text-decoration: none;
// `;

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

    handleNewCohortRedirect = () => {
        this.props.history.push('/rocket/newclass');
    };

    render() {
        return (
            <div className="Main_container">
                {this.state.cohort ? (
                    // user has at least one cohort, render a cohort card
                    <CohortCardContainer>
                        <ListCard
                            del={false}
                            add={true}
                            redirect="/rocket/newclass"
                            title="Add New Cohort"
                            label="Add"
                            contents={[
                                <FloatingAdd
                                    click={this.handleNewCohortRedirect}
                                    key={'FloatingADd_0'}
                                    large
                                />,
                            ]}
                        />
                        {this.props.state.user.cohorts.map((cohort, index) => (
                            <ListCard
                                del={console.log}
                                key={`CL_${index}`}
                                title={cohort.title}
                                redirect={`/rocket/classform/${cohort._id}`}
                                element={cohort}
                                contents={[
                                    <p>{`Total Students:\t(${cohort.students.length})`}</p>,
                                    <p>{`Participation:\t(${'100%'})`}</p>,
                                    <p>{`Rockets Sent:\t(${0})`}</p>,
                                ]}
                            />
                        ))}
                        <FloatingAdd
                            title={'Add New Cohort'}
                            floating
                            click={this.handleNewCohortRedirect}
                            large
                        />
                    </CohortCardContainer>
                ) : (
                    <FloatingAdd
                        title={'Add New Cohort'}
                        floating
                        click={this.handleNewCohortRedirect}
                        large
                    />
                )}
            </div>
        );
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        { generateBreadCrumbs }
    )(CohortList)
);
