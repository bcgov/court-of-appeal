import React from 'react';
import FormIcon from './journeyicons/FormIcon'
import GavelIcon from './journeyicons/GavelIcon'
import ClockEndCircle from "./journeyicons/ClockEndCircle";
import Trail from "./Trail";
let cn = require('classnames');
let JOURNEY_TYPE = require('../../helpers/constants');

class RespondToLeaveRefusedJourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.journey ? props.journey.id : null,
            userid: props.journey ? props.journey.userid : null,
            steps: props.journey ? JSON.parse(props.journey.steps) : [
                {status: 'new', type: 'file'},
                {status: 'new', type: 'hearing'},
            ],
            case: props.case
        }
    }
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={cn("journey-start-circle", {"completed-step": this.state.steps[0].status !== 'new'})} />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    completed={this.state.steps[0].status !== 'new'}
                    width={'25%'}
                    level={1}
                />
                <FormIcon style={{left: '28%'}}
                          twoPages={true}
                          stepTitle={"Application for Review"}
                          active={true}
                          action={this.iconClicked.bind(this, 'replybook')}
                          order={1}
                          status={this.stepStatus(1)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(1, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'31%'}
                    level={1}
                />
                <GavelIcon style={{left: '55%'}}
                           stepTitle={"The Hearing"}
                           active={true} 
                           action={this.iconClicked.bind(this, 'respondentappealhearing')}
                           order={2}
                           status={this.stepStatus(2)}
                           completed={this.stepCompleted.bind(this)}
                           ready={this.props.isStepReady(2, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    completed={this.state.steps[1].status === 'completed'}
                    width={'25%'}
                    level={1}
                />
                 <ClockEndCircle 
                     style={{position: 'absolute', left: '80%'}}
                     className={cn("any-icon", {"completed-step": this.state.steps[1].status === 'completed'})}
                     stepTitle={"Final Decision on Leave to Appeal"}
                     titleStyle={{position: 'absolute', top:'97px', width: '150px', left: '-25px'}}
                     active={true}
                     action={this.iconClicked.bind(this, 'respondentfinaldecision')}
                 />
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }

    stepStatus(stepNumber) {
        return this.state.steps[stepNumber - 1].status;
    }

    stepCompleted(stepNumber, isComplete) {
        let steps = this.state.steps;
        steps[stepNumber - 1].status = isComplete ? 'completed' : 'new';
        this.setState({steps: steps}, 
            this.props.createOrUpdateJourney(this.state.steps ,JOURNEY_TYPE.JOURNEY_TYPE_RESPOND_TO_LEAVE_REFUSED, this.setId.bind(this)));
    }

    setId(id) {
        this.setState({id:id})
    }
}
export default RespondToLeaveRefusedJourneyMap;
