import React, { Component } from 'react';
import './Form.css';
import './Form.2.css';
import Find from './find.js';

class Form2 extends Component {

    constructor(props) {
        super(props);
        this.found = this.found.bind(this);
    }

    found(parties) {
        console.log(parties);
    }

  componentDidMount () {
    const script = document.createElement("script");

    const scriptText = document.createTextNode(`
      var confirmBtn = document.getElementById('confirm');
      var modal = document.getElementById('validationModal');
      var closeBtn = document.getElementById('close-modal');

      confirmBtn.onclick = function() {
          modal.style.display = "block";
      };
      closeBtn.onclick = function() {
          modal.style.display = "none";
      };
    `);

    script.appendChild(scriptText);
    document.getElementById('validationModal').appendChild(script);
  }

  render() {
    return (
      <div id="topicTemplate" className="template container gov-container form">
        
        <div id="breadcrumbContainer">
            <ol className="breadcrumb">

                <li>
                    <a id="home" href="/">Home</a>
                </li>
                <li>
                    <a href="">Notice of Appearance (Form 2)</a>
                </li>
            </ol>
        </div>
        <div className="row">

            <div id="main-content" role="main" className="contentPageMainColumn col-sm-12">

                <div id="steps">
                    <ol>
                        <li><span className="step-circle in-progress">1</span><span className="step-title in-progress">Form 2</span></li>
                        <li><span className="step-circle future">2</span><span className="step-title future">Preview</span></li>
                        <li><span className="step-circle future">3</span><span className="step-title future">Payment</span></li>
                    </ol>
                </div>

                <div className="form-title">
                    <h1>NOTICE OF APPEARANCE</h1>
                    Form 2 (RULES 5 (A), 13 (A) AND 17 (A))
                </div>

                <div className="form-section">
                  <h2 style={{ fontWeight:'bold' }}>When Do You Use the Notice of Appearance (Form 2)?</h2>
                  <p>
                    If you have been served a Notice of Appeal (Form 7), and you want to respond,
                    fill out the Notice of Appearance (Form 2).
                    If you do not respond, you will not be included in future court proceedings related to this case,
                    and will not have access to the case documents filed.
                  </p>
                  <p>
                    You have <span style={{ fontWeight:'bold' }}>10 days</span> to serve a filed copy of the Notice of Appearance
                    to the appellant, after receiving a Notice of Appeal.
                  </p>
                </div>

                <Find callback={this.found} />                

                <div className="form-section">
                    <h2 style={{ fontWeight:'bold' }}>Style of Proceeding (Parties) in Case 20160430</h2>

                    <table><tbody>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>BETWEEN:</td>
                            <td>Jason Dent by way of their litigation guardian, Maria Terresa Dent</td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Appellant</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight:'bold' }}>AND:</td>
                            <td>Bob Jones</td>
                            <td style={{ fontWeight:'bold', paddingLeft:'70px' }}>Respondent</td>
                        </tr>
                    </tbody></table>
                </div>
                
                <div className="form-section">
                    <h2 style={{ fontWeight:'bold' }}>Enter an Appearance (on Behalf of)</h2>

                    <table><tbody>
                      <tr>
                        <td><span style={{ color:'red' }}>*</span> Respondent's name:</td>
                        <td>
                          <select>
                              <option>Bob Jones</option>
                          </select>
                        </td>
                        <td style={{ color:'gray' }}>Who is responding to the Notice of Appeal?</td>
                      </tr>
                      <tr>
                        <td><span style={{ color:'red' }}>*</span> Respondent's mail address for service:</td>
                        <td>
                          <input size="40" style={{ backgroundColor:'lightyellow' }} name="respondent-address" defaultValue="123 Harbour street, Victoria, BC"/>
                        </td>
                        <td style={{ color:'gray' }}>Where would you like to receive documents related to this case?</td>
                      </tr>
                      <tr>
                        <td><span style={{ color:'red' }}>*</span> Respondent's e-mail:</td>
                        <td><input name="respondent-email"/></td>
                      </tr>
                      <tr>
                        <td><span style={{ color:'red' }}>*</span> Respondent's phone:</td>
                        <td><input name="respondent-phone"/></td>
                      </tr>
                      <tr>
                        <td><span style={{ color:'red' }}>*</span> Respondent name (or Solicitor name):</td>
                        <td>
                            <input name="respondent-solicitor"/>
                        </td>
                        <td style={{ color:'gray' }}>Who is filing this Notice of Appearance?</td>
                      </tr>
                    </tbody></table>


                </div>

                <button id="confirm" className="btn btn-primary btn-green pull-right">Confirm</button>

                <div id="validationModal" className="modal">
                    <div className="modal-title">
                        <span id="close-modal">&times;</span>
                        Form Validation
                    </div>
                    <div className="modal-content">
                        <div className="progress">
                            <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="100"
                                aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}>
                                <span>100%</span>
                            </div>
                        </div>                        
                        <table id="validations"><tbody>
                            <tr>
                                <td className="validation">All required fields filled in</td>
                                <td><i className="far fa-check-circle"></i></td>
                            </tr>
                            <tr>
                                <td className="validation">Address for Service is in BC</td>
                                <td><i className="far fa-check-circle"></i></td>
                            </tr>
                        </tbody></table>
                        <hr/>
                        <div>
                            <span className="success">Your form has been successfully verified. Please proceed to review.</span>
                            <button className="btn btn-primary">Preview Form ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Form2;
