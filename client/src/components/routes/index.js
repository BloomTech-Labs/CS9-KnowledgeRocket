import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
import ControlPanel from '../ControlPanel/ControlPanel';
import Auth from '../Auth/Auth';
import Rocket from '../Rocket/Rocket';
import Billing from '../Billing/Billing';
import Cohort from '../Cohort/Cohort';
import Settings from '../Settings/Settings';

export default () => (
    <BrowserRouter>
        <div className='routeContainer'>
            <Route path='/rocket' component={NavBar} />
            <div className='Content_container'>
                <Route path='/rocket' component={ControlPanel} />
                <Route path='/rocket' exact component={Rocket} />
                <Route path='/rocket/billing' exact component={Billing} />
                <Route path='/rocket/classes' exact component={Cohort} />
                <Route path='/rocket/settings' exact component={Settings} />
                <Route path='/rocket/auth' exact component={Auth} />
            </div>
            <Route path='/' exact component={Home} />
        </div>
    </BrowserRouter>
);
