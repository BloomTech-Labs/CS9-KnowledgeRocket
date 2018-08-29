import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
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

const StyledContentContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
    margin-left: 9rem;
    padding: 0 1rem;

    @media (max-width: 1055px) {
        margin: 0 auto;
        max-width: 100%;
    }
`;

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="routeContainer">
                    <Route path="/rocket" component={NavBar} />
                    <StyledContentContainer>
                        <Route path="/rocket" exact component={RocketList} />
                        <Route path="/rocket/new" exact component={Rocket} />
                        <Route path="/rocket/view/:id" exact component={RocketView} />
                        <Route path="/rocket/billing" exact component={Billing} />
                        <Route path="/rocket/classForm/:id" exact component={Cohort} />
                        <Route path="/rocket/classes" exact component={CohortList} />
                        <Route path="/rocket/settings" exact component={Settings} />
                        <Route path="/rocket/auth" exact component={Auth} />
                    </StyledContentContainer>
                    <Route path="/" exact component={Home} />
                    <Route path="/question/:question/:student" exact component={RocketQuestion} />
                </div>
            </BrowserRouter>
        );
    }
}

export default Routes;
