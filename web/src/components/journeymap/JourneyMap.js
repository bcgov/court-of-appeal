import React from 'react';
import './journeymap.css';
import InfoPopupFactory from '../infopopups/common/InfoPopupFactory';
import ReactTooltip from 'react-tooltip';
import RespondToAppealJourney from './RespondToAppealJourneyMap';
import RespondToLeaveJourneyMap from "./RespondToLeaveJourneyMap";
import AppellantRightToAppealJourneyMap from "./AppellantRightToAppealJourneyMap";
import AppellantApplyForLeaveJourneyMap from "./AppellantApplyForLeaveJourneyMap";
import AppellantLeaveGrantedJourneyMap from "./AppellantLeaveGrantedJourneyMap";
import AppellantLeaveRefusedJourneyMap from "./AppellantLeaveRefusedJourneyMap";
import RespondToLeaveGrantedJourneyMap from "./RespondToLeaveGrantedJourneyMap";
import RespondToLeaveRefusedJourneyMap from "./RespondToLeaveRefusedJourneyMap";
import RespondToLeaveRefusedFinalJourneyMap from "./RespondToLeaveRefusedFinalJourneyMap";

class JourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentJourneyId: props.journeyId || null,
            showInfoModal: false,
            popupType: ''
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.getBreadCrumbsOrRestartButton = this.getBreadCrumbsOrRestartButton.bind(this);
    }

    render() {
        ReactTooltip.rebuild();

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
                {this.getBreadCrumbsOrRestartButton()}
                <h2>The Appeal Process</h2>
                { introductionText }
                
                {this.getUsersJourney()}
                <InfoPopupFactory
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

    getBreadCrumbsOrRestartButton() {
        let history = this.props.history.location.state;
        if (history && (history.appellant || history.respondent)) {
            let initial = history.appellant ? "Appealing" : "Responding";
            let secondary = history.userQuestion;
            let current = history.userState;
            return (
                <div id="journeyBreadcrumb">
                    <div className="journey-breadcrumb">
                        <div className="journey-breadcrumb crumb">
                            <button type="button" className="btn btn-link" id="home" onClick={this.goBackTwo.bind(this)}>{initial}</button>
                        </div>
                        <div className="journey-breadcrumb crumb">/</div>
                        <div className="journey-breadcrumb crumb">
                            <button type="button" className="btn btn-link" onClick={this.goBack.bind(this)}>{secondary}</button>
                        </div>
                        <div className="journey-breadcrumb crumb">/</div>
                        <div className="journey-breadcrumb crumb">
                            {current}
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"start-over"}>
                    <button onClick={this.props.startOver} >Restart journey</button>
                </div>
                    
            )
        }
    }
    
    goBackTwo() {
        this.props.history.go(-2);
    }

    goBack() {
        this.props.history.goBack();
    }

    iconClicked(type) {
        this.setState({popupType: type, showInfoModal: true});
    }
    
    getUsersJourney() {
        let props = {
            iconClicked: this.iconClicked.bind(this), 
            case: this.props.cases[0],
            isStepReady: this.isStepReady.bind(this),
            service: this.props.service,
            journey: this.props.journey,
            createOrUpdateJourney: this.createOrUpdateJourney.bind(this)
        };
        let options = {
            'respondToNoticeOfAppeal': <RespondToAppealJourney {...props} />,
            'respondToNoticeOfApplicationForLeaveToAppeal': <RespondToLeaveJourneyMap {...props}/>,
            'respondToLeaveGranted': <RespondToLeaveGrantedJourneyMap {...props} />,
            'respondToLeaveRefused': <RespondToLeaveRefusedJourneyMap {...props} />,
            'respondToLeaveRefusedFinal': <RespondToLeaveRefusedFinalJourneyMap {...props} />,
            'appellantRightToAppeal': <AppellantRightToAppealJourneyMap {...props}/>,
            'leaveToAppealRequired': <AppellantApplyForLeaveJourneyMap {...props} />,
            'appellantLeaveGranted': <AppellantLeaveGrantedJourneyMap {...props} />,
            'appellantLeaveRefused': <AppellantLeaveRefusedJourneyMap {...props} />,
        };
        return options[this.props.journeyType]
    }

    /** can be set as complete if it's (new or in progress), or (completed and the next one new) **/
    isStepReady(stepNumber, steps) {
        let stepIndex = stepNumber - 1;
        let status = steps[stepIndex].status;

        if (stepNumber === 1) {
            if ( status !== 'completed' ||
                (status === 'completed' && steps[stepIndex + 1].status === 'new')) {
                return true;
            }
        } else if (stepNumber === steps.length) {
            if (steps[stepIndex - 1].status === 'completed') {
                return true;
            }
        } else {
            if ((status !== 'completed' && steps[stepIndex - 1].status === 'completed') ||
                (status === 'completed' && steps[stepIndex + 1].status === 'new' )) {
                return true;
            }
        }
        return false;
    }
    
    createOrUpdateJourney(steps, type, callback) {
        
        let ca_number = this.props.cases[0]? this.props.cases[0].ca_number : '';
        if (!this.state.currentJourneyId) {
            this.props.service.createJourney(
                {
                    type: type,
                    state: 'started',
                    ca_number: ca_number,
                    steps: JSON.stringify(steps)
                },
                (id) => {
                    this.setState({currentJourneyId: id})
                    callback(id)
                });
        } else {
            this.props.service.updateJourney(
                {
                    type: type,
                    state: 'started',
                    ca_number: ca_number,
                    steps: JSON.stringify(steps)
                },this.state.currentJourneyId, (id)=>{console.log("Updated journey", id, this.state.currentJourneyId)});
        }
    }

}

export default JourneyMap;
