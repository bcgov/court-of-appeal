import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './Journey.css';
import JourneyMap from './journeymap/JourneyMap'
import { withRouter } from 'react-router-dom';
import DefaultService from '../service/api-service';
import { PUBLIC_URL } from '../config/environment';
const DASHBOARD_URL = `${PUBLIC_URL}/dashboard`;
let JOURNEY_TYPES = require('../helpers/constants');

class Journey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            respondent: false,
            appellant: false,
            displayJourneyMap: false,
            completeAppealTitle: '',
            appealButtonClass: 'btn round-borders btn-journey',
            respondButtonClass: 'btn round-borders btn-journey',
            journeyType: '',
            journey: null,
            journeyId: null
        };
        this.journeyForRespondent = this.journeyForRespondent.bind(this);
        this.respondToNoticeOfAppealJourney = this.respondToNoticeOfAppealJourney.bind(this);
        this.journeyForAppellant = this.journeyForAppellant.bind(this);
        this.journeyMapOrSelectionButtons = this.journeyMapOrSelectionButtons.bind(this);
        this.respondToNoticeOfLeaveToAppealJourney = this.respondToNoticeOfLeaveToAppealJourney.bind(this);
        this.respondToLeaveRefusedJourney = this.respondToLeaveRefusedJourney.bind(this);
        this.respondToLeaveRefusedFinalJourney = this.respondToLeaveRefusedFinalJourney.bind(this);
        this.respondToLeaveGrantedJourney = this.respondToLeaveGrantedJourney.bind(this);
        this.appellantRightToAppeal = this.appellantRightToAppeal.bind(this);
        this.leaveToAppealRequired = this.leaveToAppealRequired.bind(this);
        this.leaveToAppealGranted = this.leaveToAppealGranted.bind(this);
        this.leaveToAppealRefused = this.leaveToAppealRefused.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.dataTip = `<p>If you don't know whether you have the right to appeal,</p>
                        <p>please see our online guidebook for more
                        <u><a href='https://www.courtofappealbc.ca/appellant-guidebook/1.2-do-you-have-a-right-to-appeal-your-case'
                        target="_blank" rel="noopener noreferrer">
                        detailed information.</a></u></p>`;
        this.respondentQuestion =  "Served with ... ";
        this.appellantQuestion = "Do you have the right to appeal?";
        this.service = props.service;
        this.redirectToForm7 = this.redirectToForm7.bind(this);
        this.fetchMyJourney = this.fetchMyJourney.bind(this);
    }

    render() {
        ReactTooltip.rebuild();
        let content = this.journeyMapOrSelectionButtons();
        return (<div>
            {content}
            </div>
        );
    }

    componentDidMount() {
        window.onpopstate = this.handlePopState;
        this.props.history.push(DASHBOARD_URL, this.state);
        if (this.service == null) { this.service = new DefaultService(window); }
        this.fetchMyJourney()
    }

    componentWillUnmount() {
        window.onpopstate = null;
    }

    handlePopState(event) {
        this.setState(this.props.history.location.state);
        event.preventDefault();
    };

    journeyForRespondent() {
        this.setState((prevState) => {
            return {
                respondent: true,
                appellant: false,
                appealButtonClass: 'btn round-borders btn-journey btn-not-selected',
                respondButtonClass: 'btn round-borders selected btn-journey '
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });

    }

    journeyForAppellant() {
        this.setState((prevState) => {
            return {
                appellant: true,
                respondent: false,
                respondButtonClass: 'btn round-borders btn-journey btn-not-selected',
                appealButtonClass: 'btn round-borders btn-journey selected'
            }
        }, ()=> {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    appellantRightToAppeal() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_RIGHT_TO_APPEAL],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_RIGHT_TO_APPEAL,
            };
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    leaveToAppealRequired() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_REQUIRED],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_REQUIRED,
            };
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_GRANTED],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_GRANTED,
                journey: null
            };
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    leaveToAppealRefused() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_REFUSED],
                refusedStep: true,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_APPELLANT_LEAVE_REFUSED,
                journey: null
            };
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    respondToNoticeOfAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Appeal",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_APPEAL],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_APPEAL,
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    respondToNoticeOfLeaveToAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Application for Leave to Appeal",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_LEAVE],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_LEAVE,
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    respondToLeaveRefusedJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED],
                refusedStep: false,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED,
                journey: null
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    respondToLeaveRefusedFinalJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal",
                introText:JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED_FINAL],
                refusedStep: true,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED_FINAL,
                journey: null,
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    respondToLeaveGrantedJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_respondent-leave-to-appeal-granted.png",
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal ",
                introText: JOURNEY_TYPES.INTROTEXT[JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_GRANTED],
                refusedStep: false,
                journeyType: JOURNEY_TYPES.JOURNEY_TYPE_RESPOND_TO_LEAVE_GRANTED,
                journey: null,
            }
        }, () => {
            this.props.history.push(DASHBOARD_URL, this.state);
        });
    }

    journeyMapOrSelectionButtons() {
        let content = null;
        if (this.state.displayJourneyMap ) {
            content = (
                <div>
                    <JourneyMap
                        introText={this.state.introText}
                        completeAppealTitle={this.state.completeAppealTitle}
                        leaveGranted={this.leaveToAppealGranted}
                        leaveRefused={this.leaveToAppealRefused}
                        respondToLeaveRefused={this.respondToLeaveRefusedJourney}
                        respondToLeaveRefusedFinal={this.respondToLeaveRefusedFinalJourney}
                        respondToLeaveGranted={this.respondToLeaveGrantedJourney}
                        history={this.props.history}
                        redirectToForm7={this.redirectToForm7}
                        refusedStep={this.state.refusedStep}
                        journeyType={this.state.journeyType}
                        cases={this.props.cases}
                        service={this.service}
                        journey={this.state.journey}
                        journeyId={this.state.journeyId}
                        startOver={this.startOver.bind(this)}
                    />
                </div>
            );
        } else {
            content =
                <div>
                    <div className="form-section not-printable">
                        <h3>Start E-Filing</h3>
                        <div className="row">
                            <div className="col col-lg-12 col-med-6 col-sm-12 journey-questions">

                                To start e-filing, answer the questions below.
                            </div>
                            <div className="col col-lg-12 col-med-6 col-sm-12 journey-questions">
                                Are you starting or responding to an appeal?
                            </div>
                        </div>
                        <div className="row journey-buttons">
                            <div className="col col-lg-6 col-med-6 col-sm-6">
                                <button
                                    onClick={this.journeyForAppellant}
                                    className={this.state.appealButtonClass}>
                                    Starting an Appeal &nbsp;
                                    <i className="oi oi-media-play"/>
                                </button>
                            </div>
                            <div className="col col-lg-6 col-med-6 col-sm-6">
                                <button
                                    onClick={this.journeyForRespondent}
                                    className={this.state.respondButtonClass}>
                                    Responding to an Appeal &nbsp;
                                    <i className="oi oi-media-play"/>
                                </button>
                            </div>
                        </div>
                        {this.renderAppellant()}
                        {this.renderRespondent()}
                    </div>
                </div>;
        }
        return content;
    }

    startOver() {
        this.setState({
            respondent: false,
            appellant: false,
            displayJourneyMap: false,
            completeAppealTitle: '',
            appealButtonClass: 'btn round-borders btn-journey',
            respondButtonClass: 'btn round-borders btn-journey',
            journeyType: '',
            journey: null});
    }

    renderAppellant() {
        let content = null;
        if (this.state.appellant) {
            content = (
                <div>
                    <div className="row">
                        <div className="col col-lg-12 col-med-6 col-sm-12 journey-questions">
                            Do you have the right to appeal your case? &nbsp;
                                <i
                                    className="oi oi-question-mark"
                                    aria-hidden="true"
                                    data-tip={this.dataTip}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.appellantRightToAppeal}
                                    className="btn round-borders btn-journey">
                                Yes &nbsp;
                                <i className="oi oi-media-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.leaveToAppealRequired}
                                    className="btn round-borders btn-journey">
                                No &nbsp;
                                <i className="oi oi-media-play"/>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return  content;
    }

    renderRespondent() {
        let content = null;
        if (this.state.respondent) {
            content = (
                <div>
                    <div className="row">
                        <div className="col col-lg-12 col-med-6 col-sm-12">
                            <h4>Were you served with a Notice of Appeal form, or a Notice of Application for Leave
                                to Appeal?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.respondToNoticeOfAppealJourney}
                                    className="btn round-borders btn-journey">
                                Notice of Appeal &nbsp;
                                <i className="oi oi-media-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.respondToNoticeOfLeaveToAppealJourney}
                                    className="btn round-borders btn-journey">
                                Notice of Application for Leave to Appeal &nbsp;
                                <i className="oi oi-media-play"/>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    }

    fetchMyJourney() {
        this.service.getMyJourney({}, (data) => {
            if (!data.error && data.journey && data.journey.type) {
                let journey = (data.journey);
                let journeyType = '', introText = '';

                if ( journey ) {
                    journeyType = journey.type;
                    introText = JOURNEY_TYPES.INTROTEXT[journey.type]
                    this.setState({
                        journeyId: journey.id,
                        journey: journey,
                        displayJourneyMap: true,
                        journeyType: journeyType,
                        introText: introText
                    });
                }
            }
        });
    }

    redirectToForm7(){
        this.service.getPersonInfo((person)=> {
            document.cookie = 'csoext-sm-guid='+person.login+'; Domain=gov.bc.ca; Path=/cso';
            document.defaultView.location = 'https://dev.justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=f90vwa';
        });
    }

}
export default withRouter(Journey);
