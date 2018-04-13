import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import App from './App';
import Service from '../src/service/default.service';

const Login = () => (
  <Router>
    <div>
      <Authenticate />
    </div>
  </Router>
);

class Authenticate extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            authenticated: false
        }
    }

    componentDidMount() {        
        if (document.cookie.indexOf('login=') !== -1 && document.cookie.substring('login='.length).length > 0) {
            let window = this.element.ownerDocument.defaultView;
            let service = new Service(window);
            let login = document.cookie.substring('login='.length);
            service.getPersonInfo((data)=> {
                if (data && data.login === login) {
                    this.setState({
                        authenticated: true
                    })
                }
            })
        }
    }

    render() {
        if (! this.state.authenticated) {
            return (
                <div ref={ (element)=> {this.element = element }}>
                    <p>Unknown user... Please log in</p>
                    <label>login</label>
                    <input name="login" id="login" />
                    <button id="go"
                        onClick={() => {
                            let login = document.getElementById('login').value;
                            if (login.length > 0) {
                                let value = "login=" + document.getElementById('login').value;
                                document.cookie=value;
                                let service = new Service(window);
                                service.savePerson(login, (data)=> {
                                    if (data !== undefined) {
                                        this.setState({
                                            authenticated: true
                                        })    
                                    }
                                });                        
                            }
                        }}
                    >
                        Go
                    </button>
                    <p><i>Any login will work</i></p>
                </div>
            )
        }
        else {
            return (<App/>)
        }
    }
}

export default Login;