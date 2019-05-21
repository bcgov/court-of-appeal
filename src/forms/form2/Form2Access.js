import React, { Component } from 'react';
import ProgressStatusBar from '../../components/progress/ProgressStatusBar';
import '../Form.css';
import './Form2Access.css';
import DefaultService from "../../service/default.service";

class Form2Access extends Component {

    constructor(props) {
        super(props);
        this.homePath = (process.env.PUBLIC_URL === '') ? '/' : process.env.PUBLIC_URL
        this.service = props.service;
        this.state = props.location && props.location.state ? props.location.state : { caseNumber: '12345 (fake)'};
        this.state.users = []
        this.state.searching = false
        this.next = this.next.bind(this)
        this.isThisYou = this.isThisYou.bind(this)
        this.searching = false
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }

        this.setState( { searching:true }, ()=>{
            this.service.getAccountUsers((data)=>{
                this.setState( { searching:false }, ()=>{
                    let moveOver = false
                    if (data.error) { moveOver = true }

                    if (moveOver) {
                        this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: { caseNumber:this.state.caseNumber, parties:this.state.parties }});
                    }
                    else {
                        let users = data.info.client
                        if (users.length === undefined ) { users =[users] }
                        this.setState({ users: users, account:data.info.account })
                    }
                })
            })
        })
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

            <div id="breadcrumbContainer">
                <ol className="breadcrumb">
                    <li><a id="home" href={this.homePath}>Home</a></li>
                    <li><a href={this.homePath + 'start'}>Start</a></li>
                </ol>
            </div>

            <ProgressStatusBar activeStep={1} steps={["Access","Form 2","Preview","Payment"]}/>

            <div className="row section section-gray">
                <div className="col-xs-12">
                    <div className="page-title">Notice of Appearance Access</div>
                </div>
            </div>

            <div className="row section section-white">
                <div className="col-xs-12">
                    <div className="section-title">
                        Court of Appeal Case #{ this.state.caseNumber }
                    </div>
                    The following users will have access to the package containing this Notice of Appearance once it is submitted.

                    <table className="users">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th className="account-users-action-header">Read only</th>
                                <th className="account-users-action-header">Update</th>
                                <th className="account-users-action-header">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.searching ?
                                    <tr>
                                        <td colSpan="4" className="account-users-searching">
                                            <div className="efiling-spinner-blue"></div>
                                        </td>
                                    </tr>

                                :
                                    this.state.users.map((user) => {
                                        return (
                                            <tr key={user.clientId}>
                                                <td>{user.surname + ' ' + user.givenName + this.isThisYou(user)}</td>
                                                <td style={{ textAlign:'center'}}>{user.isAdmin === 'false' ? (<span className="oi oi-check"></span>): ''}</td>
                                                <td style={{ textAlign:'center'}}>{user.isAdmin === 'true' ? (<span className="oi oi-check"></span>): ''}</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })

                            }
                        </tbody>
                    </table>

                    <div style={{textAlign:'right', paddingTop:'15px'}}>
                        <button id="continue-to-form" onClick={this.next} className="btn btn-primary round-borders action-button">Fill Notice of Appeal form</button>
                    </div>
                </div>
            </div>

        </div>
        );
    }

    isThisYou(user) {
        return (user.clientId === this.state.account.clientId) ? ' (yourself)' : ''
    }

    next() {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: this.state })
    }
}
export default Form2Access;
