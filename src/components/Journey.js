import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import '../forms/journey.css';
import JourneyMap from './journeymap/JourneyMap'
import { withRouter } from 'react-router-dom';
import DefaultService from "../service/default.service";

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
            journeyType: ''
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
        this.props.history.push(process.env.PUBLIC_URL, this.state);
        if (this.service == null) { this.service = new DefaultService(window); }
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
            this.props.history.push(process.env.PUBLIC_URL, this.state);
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
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    appellantRightToAppeal() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: "Follow the steps below to complete the appeal. Start by clicking on the first form. Follow the instructions until your appeal process is complete.",
                refusedStep: false,
                journeyType: 'appellantRightToAppeal',
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealRequired() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: "If you do not have the right to appeal, and you would still like to appeal your case, you must apply for leave to appeal from the court. Follow the steps below to complete the process.",
                refusedStep: false,
                journeyType: 'leaveToAppealRequired',
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: "Now that the court has granted you the right to appeal, follow the steps below to complete the appeal. Start by clicking on the first form.",
                refusedStep: false,
                journeyType: 'appellantLeaveGranted',
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealRefused() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: "Your leave to appeal was refused, and your application for review was refused. The Court of Appeal decision is final, unless the Supreme Court of Canada agrees to hear your case.",
                refusedStep: true,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: "appellantLeaveRefused",
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToNoticeOfAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Appeal",
                introText: "You are receiving the Notice of Appeal because a previous court case you were in is being appealed. If you would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the first form.",
                refusedStep: false,
                journeyType: 'respondToNoticeOfAppeal',
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToNoticeOfLeaveToAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Application for Leave to Appeal",
                introText: "You are receiving the Notice of Application for Leave to Appeal because a previous court case you were in is being appealed, and the appellant is applying to the court for leave to appeal. If you would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the first form.",
                refusedStep: false,
                journeyType: 'respondToNoticeOfApplicationForLeaveToAppeal',
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToLeaveRefusedJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal",
                introText: "The appellant's leave to appeal was refused. You are served with a Notice of Application to Vary an Order of Justice, which means the appellant is asking three judges to review the previous judge's decision. Follow the steps below if you would like to continue to participate in the appeal process.",
                refusedStep: false,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: 'respondToLeaveRefused',
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToLeaveRefusedFinalJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal",
                introText: "The appellant's leave to appeal was refused, and their application for review was refused. The Court of Appeal decision is final, unless the Supreme Court of Canada agrees to hear their case.",
                refusedStep: true,
                completeAppealTitle: "Final Decision on Leave to Appeal",
                journeyType: 'respondToLeaveRefusedFinal',
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToLeaveGrantedJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_respondent-leave-to-appeal-granted.png",
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal ",
                introText: "The appellant's leave to appeal was granted. If you would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the first form.",
                refusedStep: false,
                journeyType: 'respondToLeaveGranted',
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
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

    redirectToForm7(){
        this.service.getPersonInfo((person)=> {
            document.cookie = 'csoext-sm-guid='+person.login+'; Domain=gov.bc.ca; Path=/cso';
            document.defaultView.location = 'https://dev.justice.gov.bc.ca/cso/ext/coa/form7/#/qualify?_k=f90vwa';
        });
    }

}
export default withRouter(Journey);
