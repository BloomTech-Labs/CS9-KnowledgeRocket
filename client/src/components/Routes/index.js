import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled, { injectGlobal } from 'styled-components';
// Components
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
// import ControlPanel from '../ControlPanel/ControlPanel';
import Auth from '../Auth/Auth';
import Rocket from '../Rocket/Rocket';
import RocketList from '../RocketList/RocketList';
import Billing from '../Billing/Billing';
import CohortList from '../CohortList/CohortList';
import Cohort from '../Cohort/Cohort';
import Settings from '../Settings/Settings';
import RocketView from '../Rocket/RocketView';
import RocketQuestion from '../RocketQuestion/RocketQuestion';
import ThankYou from '../RocketQuestion/ThankYou';
import CohortAdd from '../Cohort/CohortAdd';
import RocketResults from '../RocketResults/RocketResults';
import AuthResetPassword from '../Auth/AuthResetPassword';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

function mapStateToProps(state) {
    return {
        state,
    };
}

injectGlobal`
    * {
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
`;

const StyledContentContainer = styled.div`
    height: inherit;
    width: 100%;
    padding: ${props => (props.authenticated ? '0 0.8rem 0 10.6rem' : '0 0.8rem 0 0')};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', serif;
    @media (max-width: 960px) {
        padding: 0rem 0.8rem;
        max-width: 100%;
    }
    @media (max-width: 500px) {
        padding: 0rem 0.8rem;
        max-width: 100%;
        justify-content: center;
    }
`;

const RouteContainer = styled.div`
    background-color: #eeeeee;
    min-height: 100vh;
    width: 100%;
`;


class InnerRoutes extends Component {

    cohortIncluded = (id) => {
        let cohortIncluded = false;
        this.props.state.user.cohorts.forEach((ch) => {
            if (ch._id === id) {
                cohortIncluded = true;
            }
        });
        return cohortIncluded
    }

    rocketIncluded = (id) => {
        let rocketIncluded = false;
        this.props.state.user.rockets.forEach((r) => {
            if (r._id === id) {
                rocketIncluded = true;
            }
        });
        return rocketIncluded;
    }

    shouldRenderCohort = (props) => {
        const cohortIncluded = this.cohortIncluded(props.match.params.id);
        if (cohortIncluded) {
            return <Cohort {...props}/>
        } else {
            return <Redirect to="/rocket/classes"/>
        }        
    }

    shouldRenderRocket = (props) => {
        const rocketIncluded = this.rocketIncluded(props.match.params.id);
        if (rocketIncluded) {
            return <RocketView {...props}/>
        } else {
            return <Redirect to="/rocket"/>
        }
    }

    shouldRenderResults = (props) => {
        const rocketIncluded = this.rocketIncluded(props.match.params.rocketId);
        const cohortIncluded = this.cohortIncluded(props.match.params.cohortId);
        if (rocketIncluded && cohortIncluded) {
            return <RocketResults {...props}/>
        } else {
            return <Redirect to={`${props.history.goBack()}`}/>
        }
    }

    render() {
        return (
            <StyledContentContainer authenticated={this.props.state.user.authenticated}>
                {this.props.state.user.authenticated ? (
                    <React.Fragment>
                        <Route path="/rocket" exact component={RocketList} />
                        <Route path="/rocket/new" exact component={Rocket} />
                        <Route path="/rocket/view/:id" exact render={this.shouldRenderRocket} />
                        <Route path="/rocket/billing" exact component={Billing} />
                        <Route path="/rocket/classform/:id" exact render={this.shouldRenderCohort} />
                        <Route path="/rocket/newclass" exact component={CohortAdd} />
                        <Route path="/rocket/classes" exact component={CohortList} />
                        <Route path="/rocket/settings" exact component={Settings} />
                        <Route path="/rocket/auth" exact component={Auth} />
                        <Route
                            path="/rocket/results/:cohortId/:rocketId"
                            exact
                            render={this.shouldRenderResults}
                        />
                    </React.Fragment>
                ) : (
                    <Route path="/rocket/" component={Auth} />
                )}
            </StyledContentContainer>
        );
    }
}

const connectedInnerRoutes = connect(mapStateToProps)(InnerRoutes);

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <RouteContainer>
                    <Route path="/rocket" component={NavBar} />
                    <Route path="/rocket" component={connectedInnerRoutes} />
                    {/* <Route path="/" exact component={Home}/> */}
                    <Route
                        path="/"
                        exact
                        render={props => (
                            <Home {...props} authenticated={this.props.state.user.authenticated} />
                        )}
                    />
                    {/* THE OLD WAY OF DOING QUESTIONS */}
                    <Route path="/question/:question/:student" exact component={RocketQuestion} />
                    {/* THE NEW WAY OF DOING QUESTIONS  */}
                    <Route
                        path="/question/:cohort/:question/:student"
                        exact
                        component={RocketQuestion}
                    />
                    <Route path="/question/thankyou" exact component={ThankYou} />
                    <Route path="/forgot" component={AuthResetPassword} />
                </RouteContainer>
            </BrowserRouter>
        );
    }
}

export default connect(
    mapStateToProps,
    {}
)(Routes);
// export default Routes;
