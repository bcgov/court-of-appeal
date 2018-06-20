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
        this.leaveToAppealGranted = this.leaveToAppealGranted.bind(this);
        this.leaveToAppealRefused = this.leaveToAppealRefused.bind(this);
        this.handlePopState = this.handlePopState.bind(this);
        this.subtitles = [
            <span>The below diagram outlines the processes a typical appeal follows. There can be variations depending on circumstance.
                &nbsp;<a href="mailto:courts.cso@gov.bc.ca">Contact the Registry for more information</a>.</span>,
            "Start e-filing your response to the appeal below."
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
        this.props.history.push("/", this.state);
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
            this.props.history.push("/", this.state);
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
            this.props.history.push("/", this.state);
        });
    }

    leaveToAppealGranted() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 0,
                mapSrc: "images/journeymap/journey-map_apellant-leave-to-appeal-granted.png",
                mapProps: [{coords: "100,270,230,450", function: 'true', alt: "info about the factum"}]
            };
        }, () => {
            this.props.history.push("/", this.state);
        });
    }

    leaveToAppealRefused() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 0,
                mapSrc: "images/journeymap/journey-map_apellant-leave-to-appeal-refused.png",
                mapProps: [{alt: "e-file an appeal"}]
            };
        }, () => {
            this.props.history.push("/", this.state);
        });
    }

    respondToNoticeOfAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 1,
                mapSrc: "images/journeymap/journey-map_respondent-notice-of-appeal.png",
                mapProps: [
                    {coords: "75,20,180,200", href: "/form.2.html", alt: "e-file a notice of appearance"},
                    {coords: "465,15,580,210", function: 'true', alt: "info about the factum"}
                    ]
            }
        }, () => {
            this.props.history.push("/", this.state);
        });
    }

    respondToNoticeOfLeaveToAppealJourney() {
        this.setState((prevState) => {
            return {
                displayJourneyMap: true,
                subtitleIndex: 1,
                mapSrc: "images/journeymap/journey-map_respondent-apply-for-leave-for-appeal.png",
                mapProps: [
                    {coords: "85,15,200,210", href: "/form.2.html", alt: "e-file a notice of appearance"},
                    {coords: "285,15,385,190", function: 'true', alt: "about the Reply Book"},
                ]
            }
        }, () => {
            this.props.history.push("/", this.state);
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
                                    data-tip="<p>If you don't know whether you have the right to appeal,</p>
                                <p>Please see our online guidebook for more <a href='https://www.courtofappealbc.ca/appellant-guidebook/1.2-do-you-have-a-right-to-appeal-your-case'>
                                detailed information.</a></p>
                                "
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
                            <button onClick={this.leaveToAppealRefused}
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
