import React, { Component } from 'react';
import Header from './pages/Header.js';
import Footer from './pages/Footer.js';
import Dashboard from './pages/Dashboard.js';
import { Route, Switch } from "react-router-dom";
import Form2Start from './forms/form2/Form2Start'
import Form2Fill from './forms/form2/Form2Fill'
import Form2Preview from './forms/form2/Form2Preview'
import Form2Proceed from './forms/form2/Form2Proceed'
import Form2Submitted from './forms/form2/Form2Submitted'
import MyDocuments from './pages/MyDocuments.js';
import Notifications from './pages/Notifications.js';
import Landing from './pages/Landing.js';
import { PUBLIC_URL } from './config/environment';
import { PageNotFound } from './pages/PageNotFound';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.homePath = (PUBLIC_URL === "") ? '/' : PUBLIC_URL;
    // TODO:// is logged in? We need to use this check for several things,
      //    header currently has this.state.loggedIn but it's not really implemented
      //    need to impelment that and use it in the header, and here, anywhere in the app that finds a user is NOT
      //    logged in should forward the user to the Landing.js page
  }

  render() {
    return (
        <div className="full-height">
            <Header fetch={this.props.fetch} isLoggedIn={this.props.isLoggedIn} />
            <Switch>
                <Route exact path={this.homePath} component={Landing} showHeaderMenu={false} />
                <Route path={PUBLIC_URL + '/dashboard'} render={(any) => <Dashboard {...any} fetch={this.props.fetch}  service={this.props.service} />}/>
                <Route path={PUBLIC_URL + '/start'} component={Form2Start} />
                <Route path={PUBLIC_URL + '/fill'} component={Form2Fill} />
                <Route path={PUBLIC_URL + '/preview'} component={Form2Preview} />
                <Route path={PUBLIC_URL + '/proceed'} component={Form2Proceed} />
                <Route path={PUBLIC_URL + '/:id/submitted/*'} component={Form2Submitted} />
                <Route path={PUBLIC_URL + '/submitted/*'} component={Form2Submitted} />
                <Route path={PUBLIC_URL + '/my-documents'} render={(any) => <MyDocuments {...any} fetch={this.props.fetch} service={this.props.service}  />}/>
                <Route path={PUBLIC_URL + '/notifications'} component={Notifications} />
                <Route><PageNotFound status={404} homePath={this.homePath} /></Route>
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default App;
