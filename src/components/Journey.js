import React, { Component } from 'react';
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
            title: '',
            subTitle: '',
            appealButtonClass: 'btn-journey',

        };
        this.journeyForRespondent = this.journeyForRespondent.bind(this);
        this.respondToNoticeOfAppealJourney = this.respondToNoticeOfAppealJourney.bind(this);
        this.journeyForAppellant = this.journeyForAppellant.bind(this);
        this.journeyMapOrSelectionButtons = this.journeyMapOrSelectionButtons.bind(this);
    }

    render() {
        let content = this.journeyMapOrSelectionButtons();
        return (<div>
            {content}
            </div>
        );
    }

    journeyForRespondent () {
        this.setState({respondent: true, appellant: false});
    }

    journeyForAppellant () {
        this.setState({appellant: true, respondent: false});
    }

    respondToNoticeOfAppealJourney () {
        console.log(this.state.title);
        this.setState({
            displayJourneyMap: true,
            mapSrc: "images/journeymap/journey-map_respondent-notice-of-appeal.png",
            title: "Your Process to Respond to an Appeal",
            subTitle: "Start e-filing your response to the appeal below."
        });

    }

    journeyMapOrSelectionButtons() {
        let appellantContent = null, respondentContent = null;
        if (this.state.displayJourneyMap) {
            return <JourneyMap
                mapSrc={this.state.mapSrc}
                title={this.state.title}
                subTitle={this.state.subTitle}
            />;
        }
        if (this.state.appellant) {
            // TODO- change this to appellant specific content
            appellantContent = (
                <div >
                    <div className="row">
                        <div className="col col-lg-12 col-med-6 col-sm-12" >
                            <h4>Have you been given leave to Appeal?</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.respondToNoticeOfAppealJourney} className="btn btn-primary round-borders btn-journey" >
                                Yes &nbsp;
                                <i className="fa fa-play"/>
                            </button>
                        </div>
                        <div className="col col-lg-6 col-med-6 col-sm-6" >
                            <button onClick={this.respondToNoticeOfAppealJourney} className="btn btn-primary round-borders btn-journey">
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
                            <button onClick={this.respondToNoticeOfAppealJourney} className="btn btn-primary round-borders btn-journey">
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
                                    <button onClick={this.journeyForAppellant} className="btn btn-primary round-borders btn-journey">
                                        Start an Appeal &nbsp;
                                        <i className="fa fa-play"/>
                                    </button>
                                </div>
                                <div className="col col-lg-6 col-med-6 col-sm-6" >
                                    <button
                                        onClick={this.journeyForRespondent}
                                        className="btn btn-primary round-borders btn-journey">
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