import React from 'react';
import './caselist.css';
import DefaultService from '../service/default.service.js';

class CaseList extends React.Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            account: {}
        }
    }
    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.fetch) {
            this.service.getPersonInfo((person)=> {
                if (!person.error) {
                    this.setState({
                        account: {
                            accountId: person.accountId,
                            clientId: person.clientId
                        }
                    });
                }
            });
        }
    }
    editCell(item) {
        return (
            item.status === 'Draft' ?
                <td key={item.id+'edit'}
                    className="edit-cell"
                    id={'edit-'+item.id}
                    onClick={this.editForm.bind(this, item.data, item.id)}>
                        <i className="oi oi-pencil"/>
                </td>
                :
                <td key={item.id+'edit'} className="edit-cell">
                        <i onClick={() => window.open(item.packageUrl)} className="oi oi-magnifying-glass"/>
                </td>
        )
    }
    columns(item) {
        return ([
            this.editCell(item) ,
            <td key={item.id+'id'}>{item.id}</td>,
            <td key={item.id+'parties'}>{item.parties}</td>,
            <td key={item.id+'status'}>
                {item.status}
            </td>,
            <td key={item.id+'date'} className="text-right">{item.modified}</td>,
        ])
    }

    renderLine(item) {
        return (
            <tr className="case-item" key={item.id}>
                {this.columns(item)}
            </tr>
        )
    }
    render() {
        return (
            <div id="case-list" ref={ (element)=> {this.element = element} } >
                <table id="my-cases" className="not-printable" >
                    <thead>
                        <tr className="header">
                            <td>Action</td>
                            <td>File #</td>
                            <td>Parties</td>
                            <td>Status</td>
                            <td className="text-right">Recently Modified</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.cases.map((item) =>
                            this.renderLine(item)
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    editForm(data, id) {
        this.props.history.push({pathname: process.env.PUBLIC_URL + '/preview',state: {
            formId: id,
            caseNumber: data.formSevenNumber,
            parties: {
                appellants: data.appellants,
                respondents: data.respondents
            },
            selectedContactIndex: data.selectedContactIndex,
            useServiceEmail: data.useServiceEmail,
            sendNotifications: data.sendNotifications,
            account: this.state.account
        }})
    }

}

export default CaseList;
