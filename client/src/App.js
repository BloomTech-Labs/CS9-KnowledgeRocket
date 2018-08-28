import React, { Component } from 'react';
import Routes from './components/Routes/';

class App extends Component {
  
  render() {
    return (
      // Only Routes Here, All Components get added inside the Routes File
      // Do not add components directly to app unless you do not wish them to be routed
      // A good example would be a "Permanent Nav Bar", however it is more functional if routed.
      <div>
        {/* A Nav Bar Could Go here depending on the architecture of the app */}
        <Routes />
        {/* A Footer Could Go here depending on the architecture of the app */}
      </div>
    );
  }
}

export default App;
