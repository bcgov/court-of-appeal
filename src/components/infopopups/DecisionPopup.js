import React, { Component } from 'react';
import InfoPopupWrapper from "./common/InfoPopupWrapper";
import InfoPopupIcon from "./common/InfoPopupIcon";

class DecisionPopup extends Component {

    constructor(props) {
        super(props);
        this.onGranted = this.onGranted.bind(this);
        this.onRefused = this.onRefused.bind(this);
    }

    render () {
        let subject = this.props.type === "respondent" ? "the appellant's" : "your";

        return  (
           <InfoPopupWrapper
               title={ this.props.title }
               helpType={this.props.type}
               close={this.props.close}
           >
               <div className="info-modal-section ">
                   <div className="row" >
                       <InfoPopupIcon
                           iconSrc="/icons/icon-hearing.svg"
                           iconClass="info-modal-icon"
                       />
                       <div className="col">
                           <div className="row">
                               <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading">
                                   { this.props.question }
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="row">
                       <div className="col col-lg-1 col-md-1 col-sm-1">

                       </div>
                       <div className=" col col-lg-11 col-md-11 col-sm-11" >
                           <div className="row">
                               <div className=" col col-lg-12 col-md-12 col-sm-12"/>
                               <div className="ccol col-lg-12 col-md-12 col-sm-12 info-modal-details">
                                   <div style={{width: '100%'}}>
                                       <div className="row decision-buttons">
                                            <div className="col col-lg-6 col-med-6 col-sm-6">
                                               <button
                                                    className="btn round-borders btn-journey"
                                                    onClick={this.onGranted}
                                                >
                                                    Granted &nbsp;
                                                    <i className="oi oi-media-play"/>
                                                </button>
                                            </div>
                                           <div className="col col-lg-6 col-med-6 col-sm-6">
                                               <button
                                                   className="btn round-borders btn-journey"
                                                   onClick={this.onRefused}
                                               >
                                                  Refused &nbsp;
                                                   <i className="oi oi-media-play"/>
                                               </button>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="info-modal-divider"/>
               </div>

            </InfoPopupWrapper>
        );
    }

    onGranted() {
        this.props.close();
        this.props.type === 'respondent' ? this.props.respondToLeaveGranted() : this.props.leaveGranted();
    }

    onRefused() {
        this.props.close();
        this.props.type === 'respondent' ? (this.props.final? this.props.respondToLeaveRefusedFinal()  :  this.props.respondToLeaveRefused()) : this.props.leaveRefused();
    }

} export default DecisionPopup;