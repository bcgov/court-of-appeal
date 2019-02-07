import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form7 from './forms/Form7.js';
import Form2 from './forms/Form2.js';
import MyDocuments from './forms/MyDocuments.js';
import Notifications from './notifications.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.homePath = (process.env.PUBLIC_URL === "") ? '/' : process.env.PUBLIC_URL;
  }

  render() {
    return (
      <Router>
        <div className="full-height">
          <Header fetch={this.props.fetch}/>
          <Route exact path={this.homePath} render={()=><Dashboard fetch={this.props.fetch}/>} />
          <Route path={process.env.PUBLIC_URL + '/form.7.html'} component={Form7} />
          <Route path={process.env.PUBLIC_URL + '/form.2.html'} component={Form2} />
          <Route path={process.env.PUBLIC_URL + '/my-documents.html'} render={()=><MyDocuments fetch={this.props.fetch}/>} />
          <Route path={process.env.PUBLIC_URL + '/notifications.html'} component={Notifications} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
