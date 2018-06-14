import React, { Component } from 'react';
import '../components/infomodal.css';

class InfoModalSection extends Component {

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col col-lg-1 col-md-1 col-sm-1 icon-container-box">
                        <div shape="circle" className="info-modal-icon-container">
                            <img src={this.props.iconSrc} className={"info-modal-icon " + this.props.iconClass}/>
                        </div>
                    </div>
                    <div className="col col-lg-11 col-md-11 col sm-11">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12">
                                <div className="deadline">30 days</div>
                                <div className="info-modal-section-heading">{this.props.sectionHeading}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-1 col-md-1 col-sm-1">
                        <div className="vertical-line"
                             style={{height: '178px', marginTop: '-24px', marginBottom: '-18px'}}/>
                    </div>
                    <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-section">
                        <ol style={{fontWeight: "bolder"}}>
                            <li>Complete either the .DOCs or .PDFs below:
                                <ul>
                                    <li>Factum (Form 10)</li>
                                    <li> *Optional - Transcript and Extract Book (Form 13)</li>
                                    <li>Appeal Book (Form 12)</li>
                                </ul>
                            </li>
                            <li>
                                File the indicated number of copies to the registry.
                            </li>
                            <li>
                                Serve one copy of each document to respondent.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        );
    }

}
export default InfoModalSection;