import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import App from './App';
import Service from '../src/service/default.service';

const FakeSiteMinder = () => (
  <Router>
    <div>
      <AuthButton />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated () {
      return document.cookie.indexOf('login=') !== -1 && document.cookie.substring(5).length > 0;
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated() ? (
      <App />
    ) : (
        <div>
            <p>Please log in</p>
            <label>username</label>
            <input name="login" id="login" />
            <button id="go"
                onClick={() => {
                    let login = document.getElementById('login').value;
                    if (login.length > 0) {
                        let value = "login=" + document.getElementById('login').value;
                        document.cookie=value;
                        let service = new Service(window);
                        service.savePerson(login, function() {
                            history.push("/");
                        });                        
                    }
                }}
            >
                Go
            </button>
        </div>
    )
);

export default FakeSiteMinder;