import React from 'react';
import './journeymap.css';
import InfoPopup from './infopopups/common/InfoPopup';
import ReactTooltip from 'react-tooltip';
import PageIcon from './PageIcon';

class JourneyMap2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            popupType: ''
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
    }

    render() {
        ReactTooltip.rebuild();
        if(this.props.mapProps) {

            let anchor;
            if (this.props.respondent){
                anchor = "https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal";
            }  else {
                anchor = "https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal";
            }

            let introductionText = (
                <div>
                    { this.props.introText }
                    <br/>
                    <br/>
                    Every appeal process is unique. If you have any questions, please visit the &nbsp;
                    <a href={anchor} target="_blank" rel="noopener noreferrer">Online Guidebook</a> or &nbsp;
                    <a href="mailto:courts.cso@gov.bc.ca">contact the registry</a>.
                </div>
            );
            if (this.props.refusedStep) {
                introductionText = (
                    <div>
                        { this.props.introText }
                        &nbsp;
                        For more information about the process, please visit the 
                        <a href="https://www.scc-csc.ca/court-cour/role-eng.aspx#">Supreme Court website</a> 
                        or <a href="mailto:courts.cso@gov.bc.ca">contact the registry</a>.
                    </div>
                );
            }

            return (
                <div className="form-section "  onClick={this.handleClickOffModal.bind(this)}>
                    {this.getBreadCrumbs()}
                    <h2>The Appeal Process</h2>
                    { introductionText }
                    
                    <div className={"journey-map-container"}>
                        <div className={"journey-start-circle"} />
                        <div className={"journey-trail-l1"} >
                            <PageIcon style={{height: '100px'}}
                                      className={"journey-box p1"}
                                      twoPages={false}
                                      stepTitle={"Notice of Appearance"}
                            />
                            <PageIcon style={{height: '100px'}}
                                      className={"journey-box p2"}
                                      twoPages={false}
                                      stepTitle={"Notice of Cross Appeal"}
                            />
                            <PageIcon style={{height: '100px'}}
                                      className={"journey-box p3"}
                                      twoPages={true}
                                      stepTitle={"Factum and Appeal Book"}
                            />
                        </div>
                        <div className={"journey-right-curve"} />
                        <div className={"journey-left-curve"} />
                        <div className={"journey-trail-l2-l3"} >
                            <PageIcon style={{height: '100px'}}
                                      className={"journey-box p4"}
                                      twoPages={false}
                                      stepTitle={"The Hearing"}
                            />
                            <PageIcon style={{height: '100px'}}
                                      className={"journey-box p5"}
                                      twoPages={false}
                                      stepTitle={"Court Order"}
                            />
                        </div>
                        <div className={"journey-end-circle"} >
                            <div className={"oi oi-check journey-final-check"}/>
                        </div>
                        
                    </div>
                    <InfoPopup
                        show={this.state.showInfoModal}
                        close={this.closeInfoModal}
                        type={this.state.popupType}
                        completeAppealTitle={this.props.completeAppealTitle}
                        leaveGranted={this.props.leaveGranted}
                        leaveRefused={this.props.leaveRefused}
                        respondToLeaveRefused={this.props.respondToLeaveRefused}
                        respondToLeaveRefusedFinal={this.props.respondToLeaveRefusedFinal}
                        respondToLeaveGranted={this.props.respondToLeaveGranted}
                        redirectToForm7={this.props.redirectToForm7}
                    />
                </div>
            );
        } else {
            return null;
        }

    }

    closeInfoModal() {
        this.setState({showInfoModal:false});
    }

    openInfoModal(popupType) {
        this.setState({showInfoModal:true, popupType: popupType});
    }

    handleClickOffModal(e) {
        if (!e.target.id) {
            return;
        }
        if (this.state.showInfoModal && e.target.id.includes('info-modal')) {
            this.closeInfoModal();
        }
    }

    getBreadCrumbs() {

        let history = this.props.history.location.state;
        let initial = history.appellant ? "Appealing" : "Responding";
        let secondary = history.userQuestion;
        let current = history.userState;
        return <div id="journeyBreadcrumb">
                <div className="journey-breadcrumb">
                    <div className="journey-breadcrumb crumb">
                        <a id="home" onClick={this.goBackTwo.bind(this)}>{initial}</a>
                    </div>
                    <div className="journey-breadcrumb crumb">/</div>
                    <div className="journey-breadcrumb crumb">
                        <a onClick={this.goBack.bind(this)}>{secondary}</a>
                    </div>
                    <div className="journey-breadcrumb crumb">/</div>
                    <div className="journey-breadcrumb crumb">
                        {current}
                    </div>
                </div>
            </div>;
    }

    goBackTwo() {
        this.props.history.go(-2);
    }

    goBack() {
        this.props.history.goBack();
    }


}

export default JourneyMap2;
