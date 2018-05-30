import React, { Component } from 'react';
import './select.form.css';

class SelectForm extends Component {

    toggle(id, document) {
        let element = document.getElementById(id);
        if (element) {
            if (element.style.display === 'block') {
                element.style.display = 'none';
            } else {
                element.style.display = 'block';
            }
        }
    }

    render() {
        return (
            <div className="form-section not-printable">
                <h3>Start E-Filing</h3>
                <div>
                    <div style={{ width:'100%' }}>
                            <div className="row">
                                <div className="col col-lg-6 col-med-6 col-sm-6" >
                                    <a href="/" className="btn btn-primary round-borders start-an-appeal">
                                        Start an Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </a>
                                </div>
                                <div className="col col-lg-6 col-med-6 col-sm-6" >
                                    <a href="form.2.html" className="btn btn-primary round-borders start-an-appeal">
                                        Respond to Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </a>
                                </div>
                            </div>

                    </div>
                </div>
                        
            </div>
        )
    }
}
export default SelectForm;