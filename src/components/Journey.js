import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import '../forms/journey.css';
import JourneyMap from './JourneyMap';
import { withRouter } from 'react-router-dom';
import DefaultService from "../service/default.service";

class Journey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            respondent: false,
            appellant: false,
            displayJourneyMap: false,
            mapSrc : null,
            mapProps: null,
            completeAppealTitle: '',
            appealButtonClass: 'btn round-borders btn-journey',
            respondButtonClass: 'btn round-borders btn-journey',
        };
        this.journeyForRespondent = this.journeyForRespondent.bind(this);
        this.respondToNoticeOfAppealJourney = this.respondToNoticeOfAppealJourney.bind(this);
        this.journeyForAppellant = this.journeyForAppellant.bind(this);
        this.journeyMapOrSelectionButtons = this.journeyMapOrSelectionButtons.bind(this);
        this.respondToNoticeOfLeaveToAppealJourney = this.respondToNoticeOfLeaveToAppealJourney.bind(this);
        this.respondToLeaveRefusedJourney = this.respondToLeaveRefusedJourney.bind(this);
        this.respondToLeaveGrantedJourney = this.respondToLeaveGrantedJourney.bind(this);
        this.appellantRightToAppeal = this.appellantRightToAppeal.bind(this);
        this.leaveToAppealRequired = this.leaveToAppealRequired.bind(this);
        this.leaveToAppealGranted = this.leaveToAppealGranted.bind(this);
        this.leaveToAppealRefused = this.leaveToAppealRefused.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.dataTip = `<p>If you don't know whether you have the right to appeal,</p>
                        <p>please see our online guidebook for more 
                        <u><a href='https://www.courtofappealbc.ca/appellant-guidebook/1.2-do-you-have-a-right-to-appeal-your-case'
                        target="_blank">
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
                mapSrc: "/images/journeymap/journey-map_appellant-right-to-appeal.png",
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: "Follow the steps below to complete the appeal. Start by clicking on the first form. Follow the instructions until your appeal process is complete.",
                mapProps: [
                    { coords: "200,10,290,190", function: 'appellantinitial', alt: "how to start your appeal" },
                    { coords: "380,10,480,190", function: 'appealrecord', alt: "info about the appeal record and the transcript" },
                    { coords: "90,270,230,450", function: 'factum', alt: "info about the factum" },
                    { coords: "290,270,390,450", function: 'bookappeal', alt: "info about booking your appeal" },
                    { coords: "450,270,540,450", function: 'noticeofhearing', alt: "info about the notice of hearing" },
                    { coords: "200,540,320,690", function: 'appellanthearing', alt: "info about the hearing" },
                    { coords: "360,540,500,710", function: 'appellantcourtorder', alt: "what you need to know about the court order" },
                    { coords: "560,540,670,710", function: 'appellantcomplete', alt: "The appeal process is complete"}
                ]
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealRequired() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_appellant-apply-for-leave-to-appeal.png",
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: "If you do not have the right to appeal, and you would still like to appeal your case, you must apply for leave to appeal from the court. Follow the steps below to complete the process.",
                mapProps: [
                    { coords: "100,10,220,200", function: 'applyforleave', alt: "How to apply for leave to appeal a decision" },
                    { coords: "280,10,390,200", function: 'leavehearingdocs', alt: "Preparing for the leave to appeal hearing" },
                    { coords: "440,10,550,200", function: 'leavehearing', alt: "About the leave to appeal hearing" },
                    { coords: "600,10,690,200", function: 'decision', alt: "Were you granted leave to appeal or not?" },
                ]
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_appellant-leave-to-appeal-granted.png",
                userQuestion: this.appellantQuestion,
                userState: "Yes",
                introText: "Now that the court has granted you the right to appeal, follow the steps below to complete the appeal. Start by clicking on the first form.",
                mapProps: [
                    { coords: "100,10,220,200", function: 'appealrecord', alt: "you need an appeal record and transcript after starting your appeal" },
                    { coords: "270,10,430,200", function: 'factum', alt: "info about the factum, appeal book, and certificate of readiness" },
                    { coords: "470,10,590,200", function: 'bookappeal', alt: "info about booking your appeal" },
                    { coords: "100,290,200,440", function: 'noticeofhearing', alt: "info about the notice of hearing" },
                    { coords: "250,290,390,440", function: 'appellanthearing', alt: "info about the hearing" },
                    { coords: "430,290,510,440", function: 'appellantcourtorder', alt: "what you need to know about the court order" },
                    { coords: "560,290,680,440", function: 'appellantcomplete', alt: "The appeal process is complete"}
                    ]
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealRefused() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: null,
                userQuestion: this.appellantQuestion,
                userState: "No",
                introText: "The Court of Appeal decision is final. The appeal process is complete.",
                completeAppealTitle: "Final Decision on Leave to Appeal",
                mapProps: [
                    { coords: "180,10,290,200", function: 'review', alt: "info about the application for review" },
                    { coords: "365,10,465,190", function: 'reviewhearing', alt: "what you need to know about the review hearing" },
                    { coords: "510,10,650,190", function: 'appellantcomplete', alt: "what happens when the court of appeals refuses to grant leave to appeal" }
                    ]
            };
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToNoticeOfAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_respondent-leave-to-appeal.png",
                userQuestion: this.respondentQuestion,
                userState: "Notice of Appeal",
                introText: "You are receiving the Notice of Appeal because a previous court case you were in is being appealed. If you would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the first form.",
                mapProps: [
                    { coords: "90,10,190,200", function: "appearance", alt: "info about filing a notice of appearance" } ,
                    { coords: "270,10,380,200", function: "crossappeal", alt: "info about the cross appeal" },
                    { coords: "440,10,550,200", function: "respondentfactum", alt: "info about the factum and about the appeal book" },
                    { coords: "190,270,310,400", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "365,270,460,420", function: 'courtorder', alt: "info about the court order process" },
                    { coords: "540,270,670,420", function: 'respondentcomplete', alt: "info about the appeal process completion" },
                ]
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToNoticeOfLeaveToAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: "/images/journeymap/journey-map_respondent-apply-for-leave-for-appeal.png",
                userQuestion: this.respondentQuestion,
                userState: "Notice of Application for Leave to Appeal",
                introText: "You are receiving the Notice of Application for Leave to Appeal because a previous court case you were in is being appealed, and the appellant is applying to the court for leave to appeal. If you would like to be updated about the status of the appeal, and would like to participate in the appeal hearing, follow the instructions until the appeal process is complete. Start by clicking on the first form.",
                mapProps: [
                    { coords: "105,10,220,190", function: "leave-application-appearance", alt: "e-file a notice of appearance" },
                    { coords: "285,10,385,160", function: 'replybook', alt: "about the Reply Book" },
                    { coords: "440,10,550,160", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "590,10,650,160", function: 'respondentdecision', alt: "was the appellant granted leave or not?" }
                ]
            }
        }, () => {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    respondToLeaveRefusedJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                mapSrc: null,
                userQuestion: this.respondentQuestion,
                userState: "Notice of Leave to Appeal",
                introText: "The Court of Appeal decision is final. The appeal process is complete.",
                completeAppealTitle: "Final Decision on Leave to Appeal",
                mapProps: [
                    { coords: "195,10,295,160", function: 'replybook', alt: "about the Reply Book" },
                    { coords: "380,10,490,160", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "550,10,650,190", function: 'respondentcomplete', alt: "info about the appeal process completion" },
                ]
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
                mapProps: [
                    { coords: "160,10,260,200", function: "crossappeal", alt: "info about the cross appeal" },
                    { coords: "370,10,480,200", function: "respondentfactum", alt: "info about the factum and about the appeal book" },
                    { coords: "190,270,310,400", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "365,270,460,420", function: 'courtorder', alt: "info about the court order process" },
                    { coords: "540,270,670,420", function: 'respondentcomplete', alt: "info about the appeal process completion" },
                ]
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
                        mapSrc={this.state.mapSrc}
                        mapProps={this.state.mapProps}
                        completeAppealTitle={this.state.completeAppealTitle}
                        leaveGranted={this.leaveToAppealGranted}
                        leaveRefused={this.leaveToAppealRefused}
                        respondToLeaveRefused={this.respondToLeaveRefusedJourney}
                        respondToLeaveGranted={this.respondToLeaveGrantedJourney}
                        history={this.props.history}
                        redirectToForm7={this.redirectToForm7}
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
                                    <i className="fa fa-play"/>
                                </button>
                            </div>
                            <div className="col col-lg-6 col-med-6 col-sm-6">
                                <button
                                    onClick={this.journeyForRespondent}
                                    className={this.state.respondButtonClass}>
                                    Responding to an Appeal &nbsp;
                                    <i className="fa fa-play"/>
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
                                    className="fa fa-question-circle"
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
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.leaveToAppealRequired}
                                    className="btn round-borders btn-journey">
                                No &nbsp;
                                <i className="fa fa-play"/>
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
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.respondToNoticeOfLeaveToAppealJourney}
                                    className="btn round-borders btn-journey">
                                Notice of Application for Leave to Appeal &nbsp;
                                <i className="fa fa-play"/>
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
