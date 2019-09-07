import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import Upload from './Upload.jsx';
import Main from './Main.jsx';
import Instructions from './Instructions.jsx';
import ThisIsUs from './ThisIsUs.jsx';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      // <Router>
        <div>
          <NavBar/>
          <Main />
          <Instructions />
          <ThisIsUs/>
          {/* <NavBar/>
          <Route exact path='/upload'component={Upload}/>
          <Main />
          <Instructions />
          <ThisIsUs/> */}
        </div>
      // </Router>
    );
  }
}

export default Home;
