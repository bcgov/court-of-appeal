import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import App from './App';


const FakeSiteMinder = () => (
  <Router>
    <div>
      <AuthButton />
    </div>
  </Router>
);

const fakeAuth = {
  isAuthenticated () {
      return document.cookie.indexOf('user=') != -1 && document.cookie.substring(5).length > 0;
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
            <input name="username" id="user" />
            <button id="go"
                onClick={() => {
                    let value = "user=" + document.getElementById('user').value;
                    document.cookie=value;
                    history.push("/");
                }}
            >
                Go
            </button>
        </div>
    )
);

export default FakeSiteMinder;