import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
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
            authenticated: false,
            error: ''
        }
    }

    handleButtonClick() {
        let login = document.getElementById('login').value;
        if (login.length > 0) {
            let value = "login=" + document.getElementById('login').value;
            document.cookie=value;
            let service = new Service(window);
            service.savePerson(login, (data)=> {
                if (!data.error) {
                    this.setState({
                        authenticated: true
                    })
                }
                if (data.error && data.error.code === 503) {
                    this.setState({
                        error:'service unavailable'
                    });
                }
            });
        }
    }

    handleKeyPress(target) {
        if(target.charCode === 13){
            this.handleButtonClick();
        }
    }

    componentDidMount() {

        if (document.cookie.indexOf('login=') !== -1 && document.cookie.substring('login='.length).length > 0) {
            let window = this.element.ownerDocument.defaultView;
            let service = new Service(window);
            
            let index = document.cookie.indexOf('login=');
            let login = document.cookie.substring(index + 'login='.length);
            if (login.indexOf(';') > 0) {
                login = login.substring(0, login.indexOf(';'));
            }
            service.getPersonInfo((data)=> {
                if (data && data.login === login) {
                    this.setState({
                        authenticated: true,
                        error:''
                    })
                }
                if (data.error) {
                    this.setState({
                        authenticated: false
                    });
                    if (data.error.code === 503) {
                        this.setState({
                            error:'service unavailable'
                        });
                    }
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
                    <input
                        name="login"
                        id="login"
                        onKeyPress={ this.handleKeyPress.bind(this) }
                        autoFocus
                    />
                    <button
                        id="go"
                        onClick={ this.handleButtonClick.bind(this) }
                    >
                        Go
                    </button>
                    <p><i>Any login will work</i></p>
                    <p style={{ color:'red', display:this.state.error.length>0?'block':'none' }}>
                        Service unavailable
                    </p>
                </div>
            )
        }
        else {
            return (<App/>)
        }
    }
}

export default Login;