import React from 'react';
import './journeymap.css';
import InfoPopup from '../infopopups/common/InfoPopup';
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
            showInfoModal: false,
            popupType: ''
        };
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
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
                {this.getBreadCrumbs()}
                <h2>The Appeal Process</h2>
                { introductionText }
                
                {this.getUsersJourney()}
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

    iconClicked(type) {
        this.setState({popupType: type, showInfoModal: true});
    }
    
    getUsersJourney() {
        let props = { iconClicked: this.iconClicked.bind(this) };
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

}

export default JourneyMap;
