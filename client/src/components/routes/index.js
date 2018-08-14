import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from '../Home/Home';
import NavBar from '../NavBar/NavBar';
import ControlPanel from '../ControlPanel/ControlPanel';

export default () => (
    <BrowserRouter>
        <div className='routeContainer'>
            <Route path='/rocket' component={NavBar} />
            <Route path='/rocket' component={ControlPanel}/>
            <Route path='/' exact component={Home} />            
        </div>
    </BrowserRouter>
);
