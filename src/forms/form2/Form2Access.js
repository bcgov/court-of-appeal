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
        if (this.state.authorizations === undefined) { this.state.authorizations = [] }
        if (this.state.account === undefined) { this.state.account = {} }
        this.state.searching = false
        this.displayAddUserSection = false

        this.next = this.next.bind(this)
        this.isThisYou = this.isThisYou.bind(this)
        this.addUser = this.addUser.bind(this)
        this.userAdded = this.userAdded.bind(this)
        this.makeAdmin = this.makeAdmin.bind(this)
        this.makeReader = this.makeReader.bind(this)
        this.noMoreUserToAdd = this.noMoreUserToAdd.bind(this)
        this.userRemoved = this.userRemoved.bind(this)
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.authorizations.length === 0) {
            this.setState( { searching:true }, ()=>{
                this.service.getAccountUsers((data)=>{
                    this.setState( { searching:false }, ()=>{
                        let moveOver = false
                        if (data.error) { moveOver = true }

                        if (moveOver) {
                            this.props.history.push({pathname: process.env.PUBLIC_URL + '/fill',state: this.state});
                        }
                        else {
                            this.setState({
                                account:data.info.account,
                                authorizations: data.info.authorizations
                            })
                        }
                    })
                })
            })
        }
    }

    render() {
        return (
        <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>

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
                                    this.state.authorizations.filter((user)=> user.isActive).map((user) => {
                                        return (
                                            <tr key={user.clientId}>
                                                <td>{user.surname + ' ' + user.givenName + this.isThisYou(user)}</td>
                                                <td style={{ textAlign:'center', cursor:(user.isAdmin && user.isEditable)?'pointer':'normal' }}
                                                    onClick={ e => this.makeReader(user.clientId) }>
                                                    {!user.isAdmin ? (<span className="oi oi-check"></span>): ''}
                                                </td>
                                                <td style={{ textAlign:'center', cursor:(!user.isAdmin && user.isEditable)?'pointer':'normal' }}
                                                    onClick={ e => this.makeAdmin(user.clientId) }>
                                                    {user.isAdmin ? (<span className="oi oi-check"></span>): ''}
                                                </td>
                                                <td style={{ textAlign:'center', cursor:(user.isEditable)?'pointer':'normal' }}
                                                    onClick={ e => this.userRemoved(user.clientId) }>
                                                    {user.isEditable ? (<span className="oi oi-minus"></span>): ''}
                                                </td>
                                            </tr>
                                        )
                                    })

                            }
                        </tbody>
                    </table>

                    <button id="add-users"
                            disabled= { this.noMoreUserToAdd() }
                            onClick= { this.addUser }
                            className= "btn btn-primary round-borders">
                            Add User
                    </button>

                    <div ref={ el=> this.addUserSection = el }
                         style={{
                             marginTop: '15px',
                             display:this.state.displayAddUserSection?'block':'none' }}>
                        <select id="add-user-selection" onChange={ (e)=> this.userAdded(e.target.value) }>
                            <option></option>
                            {
                                this.state.authorizations.filter(item => !item.isActive).map((user)=>{
                                    return (
                                        <option key={user.clientId} value={user.clientId}>{user.surname + ' ' + user.givenName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="row section section-gray right">
                <div className="col-xs-12 right">
                    <button id="continue-to-form"
                            onClick={this.next}
                            className="btn btn-primary round-borders action-button">
                            Fill Notice of Appeal form
                    </button>
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

    addUser() {
        this.setState({ displayAddUserSection: true })
    }

    userAdded(clientId) {
        let authorizations = this.state.authorizations
        let user = authorizations.find(user => user.clientId == clientId)
        user.isActive = true
        this.setState({
            authorizations: authorizations,
            displayAddUserSection: false
        })
    }
    noMoreUserToAdd() {
        return this.state.authorizations.filter(item => !item.isActive).length == 0
    }
    makeAdmin(clientId) {
        let authorizations = this.state.authorizations
        let user = authorizations.find(user => user.clientId == clientId)
        if (user.isEditable) {
            user.isAdmin = true
        }
        this.setState({
            authorizations: authorizations
        })
    }
    makeReader(clientId) {
        let authorizations = this.state.authorizations
        let user = authorizations.find(user => user.clientId == clientId)
        if (user.isEditable) {
            user.isAdmin = false
        }
        this.setState({
            authorizations: authorizations
        })
    }
    userRemoved(clientId) {
        let authorizations = this.state.authorizations
        let user = authorizations.find(user => user.clientId == clientId)
        if (user.isEditable) {
            user.isActive = false
        }
        this.setState({
            authorizations: authorizations
        })
    }
}
export default Form2Access;
