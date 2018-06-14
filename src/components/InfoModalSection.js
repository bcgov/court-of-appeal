import React, { Component } from 'react';
import '../components/infomodal.css';
import InfoModalIcon from './InfoModalIcon';

class InfoModalSection extends Component {

    render() {

        let deadline = null;
        if (this.props.deadline) {
            deadline = <div className="deadline">{this.props.deadline}</div>;
        }

        return (
            <div>
                <div className="row">
                    <InfoModalIcon
                        iconSrc={this.props.iconSrc}
                        iconClass={this.props.iconClass}
                        />
                    <div className="col col-lg-11 col-md-11 col sm-11">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12">
                                {deadline}
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