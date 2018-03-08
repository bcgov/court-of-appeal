import React, { Component } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';

class App extends Component {
  render() {
    return (
      <div className="full-height">
        <Header />  
        <Dashboard />
        <Footer />      
      </div>
    );
  }
}

export default App;
