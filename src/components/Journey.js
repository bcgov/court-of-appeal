import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import '../forms/journey.css';
import JourneyMap from './JourneyMap';
import { withRouter } from 'react-router-dom';

class Journey extends Component {

    constructor(props) {
        super(props);
        this.state = {
            respondent: false,
            appellant: false,
            displayJourneyMap: false,
            mapSrc : null,
            mapProps: null,
            title: '',
            subtitleIndex: '',
            appealButtonClass: 'btn btn-primary round-borders btn-journey',
            respondButtonClass: 'btn btn-primary round-borders btn-journey',
        };
        this.journeyForRespondent = this.journeyForRespondent.bind(this);
        this.respondToNoticeOfAppealJourney = this.respondToNoticeOfAppealJourney.bind(this);
        this.journeyForAppellant = this.journeyForAppellant.bind(this);
        this.journeyMapOrSelectionButtons = this.journeyMapOrSelectionButtons.bind(this);
        this.respondToNoticeOfLeaveToAppealJourney = this.respondToNoticeOfLeaveToAppealJourney.bind(this);
        this.leaveToAppealRequired = this.leaveToAppealRequired.bind(this);
        this.leaveToAppealGranted = this.leaveToAppealGranted.bind(this);
        this.leaveToAppealRefused = this.leaveToAppealRefused.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.subtitles = [
            <span>The below diagram outlines the processes a typical appeal follows. There can be variations depending on circumstance.
                &nbsp;<a href="mailto:courts.cso@gov.bc.ca">Contact the Registry for more information</a>.</span>,
            "Start e-filing your response to the appeal below."
        ]
        this.dataTip = `<p>If you don't know whether you have the right to appeal,</p>
                        <p>Please see our online guidebook for more 
                        <a href='https://www.courtofappealbc.ca/appellant-guidebook/1.2-do-you-have-a-right-to-appeal-your-case'>
                        detailed information.</a></p>`;
    }

    render() {
        let content = this.journeyMapOrSelectionButtons();
        return (<div>
            {content}
            </div>
        );
    }

    componentDidMount() {
        window.onpopstate = this.handlePopState;
        this.props.history.push(process.env.PUBLIC_URL, this.state);
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
                appealButtonClass: 'btn btn-primary round-borders btn-journey btn-not-selected',
                respondButtonClass: 'btn btn-primary round-borders btn-journey'
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
                respondButtonClass: 'btn btn-primary round-borders btn-journey btn-not-selected',
                appealButtonClass: 'btn btn-primary round-borders btn-journey'
            }
        }, ()=> {
            this.props.history.push(process.env.PUBLIC_URL, this.state);
        });
    }

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 0,
                mapSrc: "/images/journeymap/journey-map_apellant-leave-to-appeal-granted.png",
                mapProps: [
                    { coords: "150,0,250,180", function: 'appellantinitial', alt: "how to start your appeal" },
                    { coords: "350,0,450,180", function: 'appealrecord', alt: "info about the appeal record and the transcript" },
                    { coords: "60,270,180,450", function: 'factum', alt: "info about the factum" },
                    { coords: "260,270,370,450", function: 'bookappeal', alt: "info about booking your appeal" },
                    { coords: "450,270,530,450", function: 'noticeofhearing', alt: "info about the notice of hearing" },
                    { coords: "160,520,280,710", function: 'appellanthearing', alt: "info about the hearing" },
                    { coords: "320,520,450,710", function: 'appellantcourtorder', alt: "what you need to know about the court order" }
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
                subtitleIndex: 0,
                mapSrc: "/images/journeymap/journey-map_apellant-apply-for-leave-to-appeal.png",
                mapProps: [
                    { coords: "50,0,200,200", function: 'applyforleave', alt: "How to apply for leave to appeal a decision" },
                    { coords: "260,0,360,200", function: 'leavehearingdocs', alt: "Preparing for the leave to appeal hearing" },
                    { coords: "460,0,560,200", function: 'leavehearing', alt: "About the leave to appeal hearing" },
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
                subtitleIndex: 0,
                mapSrc: "/images/journeymap/journey-map_apellant-leave-to-appeal-refused.png",
                mapProps: [
                    { coords: "340,10,450,200", function: 'reviewhearing', alt: "what you need to know about the review hearing" },
                    { coords: "150,10,230,200", function: 'review', alt: "info about the application for review" }
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
                subtitleIndex: 1,
                mapSrc: "/images/journeymap/journey-map_respondent-notice-of-appeal.png",
                mapProps: [
                    { coords: "75,10,180,200", function: "appearance", alt: "info about filing a notice of appearance" } ,
                    { coords: "250,10,370,200", function: "crossappeal", alt: "info about the cross appeal" },
                    { coords: "450,10,565,200", function: "respondentfactum", alt: "info about the factum and about the appeal book" },
                    { coords: "150,270,270,400", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "345,270,460,420", function: 'courtorder', alt: "info about the court order process"  }
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
                subtitleIndex: 1,
                mapSrc: "/images/journeymap/journey-map_respondent-apply-for-leave-for-appeal.png",
                mapProps: [
                    { coords: "85,10,200,190", function: "leave-application-appearance", alt: "e-file a notice of appearance" },
                    { coords: "285,10,385,190", function: 'replybook', alt: "about the Reply Book" },
                    { coords: "460,5,570,160", function: 'respondenthearing', alt: "info about the hearing" }
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
                        mapSrc={this.state.mapSrc}
                        mapProps={this.state.mapProps}
                        title={this.state.title}
                        subTitle={this.subtitles[this.state.subtitleIndex]}
                    />
                </div>
            );
        } else {
            content =
                <div>
                    <div className="form-section not-printable">
                        <h3>Start E-Filing</h3>
                        <div>
                            <div style={{width: '100%'}}>
                                <div className="row">
                                    <div className="col col-lg-6 col-med-6 col-sm-6">
                                        <button
                                            onClick={this.journeyForAppellant}
                                            className={this.state.appealButtonClass}>
                                            Start an Appeal &nbsp;
                                            <i className="fa fa-play"/>
                                        </button>
                                    </div>
                                    <div className="col col-lg-6 col-med-6 col-sm-6">
                                        <button
                                            onClick={this.journeyForRespondent}
                                            className={this.state.respondButtonClass}>
                                            Respond to Appeal &nbsp;
                                            <i className="fa fa-play"/>
                                        </button>
                                    </div>
                                </div>
                                {this.renderAppellant()}
                                {this.renderRespondent()}
                            </div>
                        </div>
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
                        <div className="col col-lg-12 col-med-6 col-sm-12">
                            <h4>Do you have a right to appeal your case? &nbsp;
                                <i
                                    className="fa fa-question-circle"
                                    aria-hidden="true"
                                    data-tip={this.dataTip}
                                />
                            </h4>
                        </div>
                        <ReactTooltip
                            multiline={true}
                            html={true}
                            effect="solid"
                            delayHide={1000}
                            className="right-to-appeal-tooltip"/>
                    </div>
                    <div className="row">
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.leaveToAppealGranted}
                                    className="btn btn-primary round-borders btn-journey">
                                Yes &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.leaveToAppealRequired}
                                    className="btn btn-primary round-borders btn-journey">
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
                                    className="btn btn-primary round-borders btn-journey">
                                Notice of Appeal &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6">
                            <button onClick={this.respondToNoticeOfLeaveToAppealJourney}
                                    className="btn btn-primary round-borders btn-journey">
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

}
export default withRouter(Journey);
