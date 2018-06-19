import React, { Component } from 'react';
import '../components/infomodal.css';
import InfoModalIcon from './InfoModalIcon';

class InfoModalSection extends Component {

    render() {

        let deadline = null;
        if (this.props.deadline) {
            deadline = <div className="deadline">{this.props.deadline}</div>;
        }
        let verticalLine = null;
        if (this.props.lineHeight) {
            verticalLine = (
                <div className="col col-lg-1 col-md-1 col-sm-1">
                    <div className="vertical-line" style={{height: this.props.lineHeight}}/>
                </div>
            );
        }

        return (
            <div className="info-modal-section">
                <div className="row">
                    <InfoModalIcon
                        iconSrc={this.props.iconSrc}
                        iconClass={this.props.iconClass}
                        />
                    <div className="col col-lg-11 col-md-11 col sm-11 top-deadline">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12">
                                {deadline}
                                <div className="info-modal-section-heading">{this.props.sectionHeading}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {verticalLine}
                    <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-details info-modal-divider">
                        <div className="row">
                            <div className="col col-lg-12 col-md-12 col-sm-12  info-modal-ol" >
                                <div className="">1.&nbsp;&nbsp;Complete either the .DOCs or .PDFs below:
                                    <div className="row bullet-list-row" >
                                        <div className="col col-lg-1 col-md-1 bullet-div">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" >
                                            Factum (Form 10)
                                        </div>
                                        <div className="col col-lg-1 col-md-1">4 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
                                    <div className="row bullet-list-row">
                                        <div className="col col-lg-1 col-md-1 bullet-div">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" >
                                            <div>* Optional - Transcript and Extract Book (Form 13)</div>
                                        </div>
                                        <div className="col col-lg-1 col-md-1">1 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
                                    <div className="row bullet-list-row">
                                        <div className="col col-lg-1 col-md-1 bullet-div">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" >
                                            Appeal Book (Form 12)</div>
                                        <div className="col col-lg-1 col-md-1">4 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
                                </div>
                                <div >2.&nbsp;&nbsp;File the indicated number of copies to the registry.
                                </div>
                                <div >
                                    3.&nbsp;&nbsp;Serve one copy of each document to respondent.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
export default InfoModalSection;

/*
<div className="row bullet-list-row" >
                                        <div className="col col-lg-1 col-md-1 bullet-div">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" >
                                            Factum (Form 10)
                                        </div>
                                        <div className="col col-lg-1 col-md-1">4 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
                                    <div className="row bullet-list-row">
                                        <div className="col col-lg-1 col-md-1">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" style={{padding: 0, marginLeft: '-15px'}}>
                                            <div>* Optional - Transcript and Extract Book (Form 13)</div>
                                        </div>
                                        <div className="col col-lg-1 col-md-1">1 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
                                    <div className="row bullet-list-row">
                                        <div className="col col-lg-1 col-md-1">
                                            <div className="bullet" />
                                        </div>
                                        <div className="col col-lg-8 col-md-8" style={{padding: 0, marginLeft: '-15px'}}>
                                            Appeal Book (Form 12)</div>
                                        <div className="col col-lg-1 col-md-1">4 x</div>
                                        <div className="col col-lg-1 col-md-1">Doc</div>
                                        <div className="col col-lg-1 col-md-1">PDF</div>
                                    </div>
 */