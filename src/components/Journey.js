import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import '../forms/journey.css';
import JourneyMap from './JourneyMap';

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
            subTitle: '',
            appealButtonClass: 'btn btn-primary round-borders btn-journey',
            respondButtonClass: 'btn btn-primary round-borders btn-journey',
        };
        this.journeyForRespondent = this.journeyForRespondent.bind(this);
        this.respondToNoticeOfAppealJourney = this.respondToNoticeOfAppealJourney.bind(this);
        this.journeyForAppellant = this.journeyForAppellant.bind(this);
        this.journeyMapOrSelectionButtons = this.journeyMapOrSelectionButtons.bind(this);
        this.respondToNoticeOfLeaveToAppealJourney = this.respondToNoticeOfLeaveToAppealJourney.bind(this);
        this.startAppeal = this.startAppeal.bind(this);
        this.leaveToAppealGranted = this.leaveToAppealGranted.bind(this);
        this.leaveToAppealRefused = this.leaveToAppealRefused.bind(this);
    }

    render() {
        let content = this.journeyMapOrSelectionButtons();
        return (<div>
            {content}
            </div>
        );
    }

    journeyForRespondent() {
        this.setState({
            respondent: true,
            appellant: false,
            appealButtonClass: 'btn btn-primary round-borders btn-journey btn-not-selected',
            respondButtonClass: 'btn btn-primary round-borders btn-journey'
        });
    }

    journeyForAppellant() {
        this.setState({
            appellant: true,
            respondent: false,
            respondButtonClass: 'btn btn-primary round-borders btn-journey btn-not-selected',
            appealButtonClass: 'btn btn-primary round-borders btn-journey'
        });
    }

    startAppeal() {
        this.setState({
            displayJourneyMap: true,
            subTitle: "Start e-filing your appeal below."
        })
    }

    leaveToAppealGranted() {
        this.startAppeal();
        this.setState({
            mapSrc: "images/journeymap/journey-map_apellant-leave-to-appeal-granted.png",
            mapProps: [{alt: "e-file an appeal"}]
        })
    }

    leaveToAppealRefused() {
        this.startAppeal();
        this.setState({
            mapSrc: "images/journeymap/journey-map_apellant-leave-to-appeal-refused.png",
            mapProps: [{alt: "e-file an appeal"}]
        })
    }

    respondToAppeal() {
        this.setState({
            displayJourneyMap: true,
            subTitle: "Start e-filing your response to the appeal below.",
        });
    }

    respondToNoticeOfAppealJourney() {
       this.respondToAppeal();
       this.setState({
           mapSrc: "images/journeymap/journey-map_respondent-notice-of-appeal.png",
           mapProps: [{coords: "75,20,180,200", href: "/form.2.html", alt: "e-file a notice of appearance"}]

       })
    }

    respondToNoticeOfLeaveToAppealJourney() {
        this.respondToAppeal();
        this.setState({
            mapSrc: "images/journeymap/journey-map_respondent-apply-for-leave-for-appeal.png",
            mapProps: [{coords: "85,15,200,210", href: "/form.2.html", alt: "e-file a notice of appearance"}]
        });
    }

    journeyMapOrSelectionButtons() {
        let appellantContent = null, respondentContent = null;
        if (this.state.displayJourneyMap) {
            return <JourneyMap
                mapSrc={this.state.mapSrc}
                mapProps={this.state.mapProps}
                title={this.state.title}
                subTitle={this.state.subTitle}
            />;
        }
        if (this.state.appellant) {

            appellantContent = (
                <div >
                    <div className="row">
                        <div className="col col-lg-12 col-med-6 col-sm-12" >
                            <h4>Do you have a right to appeal your case? &nbsp;
                                <i
                                    className="fa fa-question-circle"
                                    aria-hidden="true"
                                    data-tip="<p>If you don't know whether you have the right to appeal,</p>
                                    <p>this message will eventually lead <a href='http://bfy.tw/IUO8'>
                                    to detailed information.</a></p>
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
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.leaveToAppealGranted} className="btn btn-primary round-borders btn-journey" >
                                Yes &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.leaveToAppealRefused} className="btn btn-primary round-borders btn-journey">
                                No &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else if (this.state.respondent) {
            respondentContent = (
                <div >
                    <div className="row">
                        <div className="col col-lg-12 col-med-6 col-sm-12" >
                            <h4>Were you served with a Notice of Appeal form, or a Notice of Application for Leave to Appeal?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.respondToNoticeOfAppealJourney} className="btn btn-primary round-borders btn-journey" >
                                Notice of Appeal &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.respondToNoticeOfLeaveToAppealJourney} className="btn btn-primary round-borders btn-journey">
                                Notice of Application for Leave to Appeal &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                    </div>
                </div>
            );
        }


        return (
            <div>
                <div className="form-section not-printable">
                    <h3>Start E-Filing</h3>
                    <div>
                        <div style={{ width:'100%' }}>
                            <div className="row">
                                <div className="col col-lg-6 col-med-6 col-sm-6" >
                                    <button
                                        onClick={this.journeyForAppellant}
                                        className={this.state.appealButtonClass}>
                                        Start an Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </button>
                                </div>
                                <div className="col col-lg-6 col-med-6 col-sm-6" >
                                    <button
                                        onClick={this.journeyForRespondent}
                                        className={this.state.respondButtonClass}>
                                        Respond to Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </button>
                                </div>
                            </div>
                            {appellantContent}
                            {respondentContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Journey;