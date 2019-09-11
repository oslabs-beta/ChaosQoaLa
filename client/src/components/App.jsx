import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home.jsx';
// import NavBar from './NavBar.jsx';
import Upload from './Upload.jsx';
import NavBar from './NavBar.jsx';
// import Main from './Main.jsx';
// import Instructions from './Instructions.jsx';
// import ThisIsUs from './ThisIsUs.jsx';
class App extends Component {
    constructor() {
      super();
      this.state = {};
    }
  
    render() {
      return (
        <Fragment>   
        <Router>
          <NavBar/>
          <Route exact path="/" component={Home}/>
          {/* <NavBar/> */}
          <Route path="/upload"component={Upload}/>
          {/* <Main />
          <Instructions />
          <ThisIsUs/> */}
        </Router>
      </Fragment>
      );
    }
  }

export default App;