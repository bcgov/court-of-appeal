import React from 'react';
import './journeymap.css';
import InfoPopup from '../infopopups/common/InfoPopup';
import ReactTooltip from 'react-tooltip';

class JourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            popupType: ''
        };
        this.getAreas = this.getAreas.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
    }

    render() {
        ReactTooltip.rebuild();
        if(this.props.mapProps) {
            let targetAreas = this.getAreas();

            let anchor;
            if (this.props.respondent){
               anchor = "https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal";
            }  else {
               anchor = "https://www.courtofappealbc.ca/appellant-guidebook/step-1-deciding-to-appeal";
            }

            let journeyMapImage = null;
            if (this.props.mapSrc) {
                journeyMapImage = (
                    <img id="journey-map-image" className="journey-map-image" src={process.env.PUBLIC_URL + this.props.mapSrc} useMap="#journeymap" alt="Your Appeal Journey Map" />
                )
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
            )
            if (this.props.refusedStep) {
                introductionText = (
                    <div>
                        { this.props.introText }
                        &nbsp;
                        For more information about the process, please visit the <a href="https://www.scc-csc.ca/court-cour/role-eng.aspx#">Supreme Court website</a> or <a href="mailto:courts.cso@gov.bc.ca">contact the registry</a>.
                    </div>
                )
            }

            return (
                <div className="form-section "  onClick={this.handleClickOffModal.bind(this)}>
                    {this.getBreadCrumbs()}
                    <h2>The Appeal Process</h2>
                    { introductionText }

                    { journeyMapImage }
                    <map name="journeymap" >
                        {targetAreas}
                    </map>
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

    getAreas() {
        return this.props.mapProps.map((prop, key) => {
            if (prop.function) {
                return <area alt={prop.alt}  onClick={this.openInfoModal.bind(this, prop.function)} key={key} shape="rect" {...prop} />;
            } else {
                return <area alt={prop.alt} key={key} shape="rect" {...prop}/>
            }
        });
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

export default JourneyMap;
