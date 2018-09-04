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
    padding: ${props => props.authenticated ? '0rem 0.8rem 0.8rem 10.6rem' : '0rem 0.8rem 0.8rem 0rem'};
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto', serif;
    @media (max-width: 960px) {
        padding: 0rem 0.8rem 0.8rem 0.8rem;
        max-width: 100%;
    }
    @media (max-width: 500px) {
        padding: 0rem 0.8rem 0 0.8rem;
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
    render() {
        return (
            <StyledContentContainer authenticated={this.props.state.user.authenticated}>
                <Route path="/rocket" exact component={RocketList} />
                <Route path="/rocket/new" exact component={Rocket} />
                <Route path="/rocket/view/:id" exact component={RocketView} />
                <Route path="/rocket/billing" exact component={Billing} />
                <Route path="/rocket/classform/:id" exact component={Cohort} />
                <Route path="/rocket/newclass" exact component={CohortAdd} />
                <Route path="/rocket/classes" exact component={CohortList} />
                <Route path="/rocket/settings" exact component={Settings} />
                <Route path="/rocket/auth" exact component={Auth} />
                <Route path="/rocket/results" exact component={RocketResults} />
            </StyledContentContainer>
        );
    }
}

const connectedInnerRoutes = connect(mapStateToProps)(InnerRoutes)

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <RouteContainer>
                    <Route path="/rocket" component={NavBar} />
                    <Route path="/rocket" component={connectedInnerRoutes} />
                    <Route path="/" exact component={Home}/>
                    {/* <Route path="/" exact render={props => (<Home {...props}/>)}/> */}
                    {/* THE OLD WAY OF DOING QUESTIONS */}
                    <Route path="/question/:question/:student" exact component={RocketQuestion} />
                    {/* THE NEW WAY OF DOING QUESTIONS  */}
                    <Route path="/question/:cohort/:question/:student" exact component={RocketQuestion} />
                    <Route path="/question/thankyou" exact component={ThankYou} />
                    <Route path="/forgot" component={AuthResetPassword} />
                </RouteContainer>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps,{})(Routes);
// export default Routes;
