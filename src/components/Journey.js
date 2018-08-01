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
            appealButtonClass: 'btn round-borders btn-journey',
            respondButtonClass: 'btn round-borders btn-journey',
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
        this.dataTip = `<p>If you don't know whether you have the right to appeal,</p>
                        <p>please see our online guidebook for more 
                        <a href='https://www.courtofappealbc.ca/appellant-guidebook/1.2-do-you-have-a-right-to-appeal-your-case'
                        target="_blank">
                        detailed information.</a></p>`;
        this.subtitles = [
            <span>The below diagram outlines the processes a typical appeal follows. There can be variations depending on circumstance.
                &nbsp;<a href="mailto:courts.cso@gov.bc.ca">Contact the Registry for more information</a>.</span>,

            <div>
                Follow the steps below to respond to the appeal.
                <br/>
                Every appeal process is different.
                If you have any questions, please visit the <a href="https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal">Help Guide Website</a> or <a href="mailto:courts.cso@gov.bc.ca">contact the registry</a>.
            </div>
        ]

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

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 0,
                mapSrc: "/images/journeymap/journey-map_appellant-leave-to-appeal-granted.png",
                mapProps: [
                    { coords: "200,10,290,190", function: 'appellantinitial', alt: "how to start your appeal" },
                    { coords: "380,10,480,190", function: 'appealrecord', alt: "info about the appeal record and the transcript" },
                    { coords: "110,270,230,450", function: 'factum', alt: "info about the factum" },
                    { coords: "300,270,400,450", function: 'bookappeal', alt: "info about booking your appeal" },
                    { coords: "475,270,560,450", function: 'noticeofhearing', alt: "info about the notice of hearing" },
                    { coords: "200,540,320,690", function: 'appellanthearing', alt: "info about the hearing" },
                    { coords: "360,540,500,710", function: 'appellantcourtorder', alt: "what you need to know about the court order" }
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
                mapSrc: "/images/journeymap/journey-map_appellant-apply-for-leave-to-appeal.png",
                mapProps: [
                    { coords: "100,10,220,200", function: 'applyforleave', alt: "How to apply for leave to appeal a decision" },
                    { coords: "280,10,390,200", function: 'leavehearingdocs', alt: "Preparing for the leave to appeal hearing" },
                    { coords: "440,10,550,200", function: 'leavehearing', alt: "About the leave to appeal hearing" },
                    { coords: "600,10,690,200", function: 'decision', alt: "About the leave to appeal hearing" },
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
                mapSrc: "/images/journeymap/journey-map_appellant-leave-to-appeal-refused.png",
                mapProps: [
                    { coords: "180,10,290,200", function: 'review', alt: "info about the application for review" },
                    { coords: "365,10,465,190", function: 'reviewhearing', alt: "what you need to know about the review hearing" },

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
                mapSrc: "/images/journeymap/journey-map_respondent-leave-to-appeal.png",
                mapProps: [
                    { coords: "115,10,210,200", function: "appearance", alt: "info about filing a notice of appearance" } ,
                    { coords: "290,10,400,200", function: "crossappeal", alt: "info about the cross appeal" },
                    { coords: "470,10,585,200", function: "respondentfactum", alt: "info about the factum and about the appeal book" },
                    { coords: "200,270,320,400", function: 'respondenthearing', alt: "info about the hearing" },
                    { coords: "385,270,500,420", function: 'courtorder', alt: "info about the court order process"  }
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
                    { coords: "105,10,220,190", function: "leave-application-appearance", alt: "e-file a notice of appearance" },
                    { coords: "285,10,385,160", function: 'replybook', alt: "about the Reply Book" },
                    { coords: "440,10,550,160", function: 'respondenthearing', alt: "info about the hearing" }
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
                        subtitle={this.subtitles[this.state.subtitleIndex]}
                        leaveGranted={this.leaveToAppealGranted}
                        leaveRefused={this.leaveToAppealRefused}
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

}
export default withRouter(Journey);
