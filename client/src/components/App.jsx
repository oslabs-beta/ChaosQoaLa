import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Upload from './Upload.jsx';
import Main from './Main.jsx';
import Instructions from './Instructions.jsx';
import ThisIsUs from './ThisIsUs.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Main />
          <Instructions />
          <ThisIsUs/>
          <Route exact path='/upload'component={Upload}/>
        </div>
      </Router>
    );
  }
}

export default App;
