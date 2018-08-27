import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
// Components
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
import ControlPanel from '../ControlPanel/ControlPanel';
import Auth from '../Auth/Auth';
import Rocket from '../Rocket/Rocket';
import RocketList from '../RocketList/RocketList';
import Billing from '../Billing/Billing';
import CohortList from '../CohortList/CohortList';
import Cohort from '../Cohort/Cohort';
import Settings from '../Settings/Settings';
import RocketView from '../Rocket/RocketView';
import RocketQuestion from '../RocketQuestion/RocketQuestion';

function mapStateToProps(state) {
    return {
        state,
    };
}

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="routeContainer">
                    <Route path="/rocket" component={NavBar} />
                    <div className="Content_container">
                        <Route path="/rocket" component={ControlPanel} />
                        <Route path="/rocket" exact component={RocketList} />
                        <Route path="/rocket/new" exact component={Rocket} />
                        <Route path="/rocket/view/:id" exact component={RocketView} />
                        <Route path="/rocket/billing" exact component={Billing} />
                        <Route path="/rocket/classForm/:id" exact component={Cohort} />
                        <Route path="/rocket/classes" exact component={CohortList} />
                        <Route path="/rocket/settings" exact component={Settings} />
                        <Route path="/rocket/auth" exact component={Auth} />
                    </div>
                    <Route path="/" exact component={Home} />
                    <Route path='/question/:question/:student' exact component={RocketQuestion}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect(mapStateToProps)(Routes);
