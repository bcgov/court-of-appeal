import React, { Component } from 'react';

class Dashboard extends Component {
  render() {
    return (
        <div id="topicTemplate" className="template container gov-container">

            <div className="row">

                <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">
                
                    <div id="body">
                        <h2>COURT OF APPEAL FORMS</h2>
                        <h3>
                        <span style={{ fontWeight:'bold' }}>DOCUMENTS TO BE USED BY THE APPELANT</span> <span style={{ color:'gray' }}>(Use these documents if you are STARTING the appeal)</span>
                        </h3>

                        <h4>Right to Appeal <span style={{ color:'gray' }}>(Start appeal without court's permission)</span></h4>
                        <ul>
                            <li><a id="form7" href="/forms/form.7.html" target="_self">Notice of Appeal (Form 7)</a></li>
                            <li>Affidavit of Service <i className="far fa-file"></i><i className="far fa-file-pdf"></i></li>
                        </ul>

                        <h4>Leave to Appeal <span style={{ color:'gray' }}>(with court's permission)</span></h4>
                        <ul>
                            <li>Notice of Application for Leave to Appeal (Form 1)</li>
                        </ul>

                        <h3>
                        <span style={{fontWeight:'bold' }}>DOCUMENTS TO BE USED BY THE RESPONDENT</span> <span style={{ color:'gray' }}>(Use these documents if you are STARTING the appeal)</span>
                        </h3>

                        <h4>Right to Appeal <span style={{ color:'gray' }}>(Start appeal without court's permission)</span></h4>
                        <ul>
                            <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form 2)</a>&nbsp;</li>
                        </ul>

                        <h4>Leave to Appeal <span style={{ color:'gray' }}>(with court's permission)</span></h4>
                        <ul>
                            <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form 2)</a>&nbsp;</li>
                        </ul>
                    </div>
                </div>


            </div>
        </div>
    );
  }
}

export default Dashboard;
