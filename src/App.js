import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form7 from './forms/Form.7.js';
import Form2 from './forms/Form.2.js';
import MyApplications from './forms/my.applications.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="full-height">
          <Header />  
          <Route exact path="/" component={Dashboard} /> 
          <Route path="/forms/form.7.html" component={Form7} />        
          <Route path="/forms/form.2.html" component={Form2} />        
          <Route path="/my-applications.html" component={MyApplications} />        
          <Footer />      
        </div>
      </Router>
    );
  }
  componentDidMount() {
    console.log('NODE_ENV: ' + process.env.NODE_ENV);
    console.log('REACT_APP_API_URL: ' + process.env.REACT_APP_API_URL);
  }
}

export default App;
