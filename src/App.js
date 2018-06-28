import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form7 from './forms/Form.7.js';
import Form2 from './forms/Form.2.js';
import MyApplications from './forms/my.applications.js';
import Notifications from './notifications.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="full-height">
          <Header />  
          <Route exact path={process.env.PUBLIC_URL} component={Dashboard} /> 
          <Route path={process.env.PUBLIC_URL + '/form.7.html'} component={Form7} />        
          <Route path={process.env.PUBLIC_URL + '/form.2.html'} component={Form2} />        
          <Route path={process.env.PUBLIC_URL + '/my-applications.html'} component={MyApplications} />        
          <Route path={process.env.PUBLIC_URL + '/notifications.html'} component={Notifications} />        
          <Footer />      
        </div>
      </Router>
    );
  }
}

export default App;
