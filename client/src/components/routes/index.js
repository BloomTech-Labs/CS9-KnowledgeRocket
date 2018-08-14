import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Dummy from '../dummy/dummy';
import NavBar from '../NavBar/NavBar';
import ControlPanel from '../ControlPanel/ControlPanel';
import Auth from '../Auth/Auth';

export default () => (
    <BrowserRouter>
        <div className='routeContainer'>
            <Route path='/rocket' component={NavBar} />
            <Route path='/rocket' component={ControlPanel}/>
            <Route path='/' exact component={Dummy} />
            <Route path='/rocket/auth' exact component={Auth} />
        </div>
    </BrowserRouter>
);
