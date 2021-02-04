import React from 'react';
import FormIcon from './journeyicons/FormIcon'
import GavelEndCircle from "./journeyicons/GavelEndCircle";
import Trail from "./Trail";
let cn = require('classnames');
let JOURNEY_TYPE = require('../../helpers/constants');

class AppellantApplyForLeaveJourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.journey ? props.journey.id : null,
            userid: props.journey ? props.journey.userid : null,
            steps: props.journey ? JSON.parse(props.journey.steps) : [
                {status: 'new', type: 'applyforleave'},
                {status: 'new', type: 'leavehearingdocs'},
            ],
            case: props.case
        }
    }
    
    render() {
        return (
            <div className={"journey-map-container"}>
               <div className={cn("journey-start-circle", {"completed-step": this.state.steps[0].status !== 'new'})} />
                <div
                    style={{marginLeft: '50px',
                        borderTop: '9px solid rgb(159, 191, 226)',
                        width: '79%',
                        position: 'absolute',
                        top: '41.5%',
                        zIndex: '0'
                    }}/>
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[0].status !== 'new'}
                    width={'28%'}
                    level={1}
                />
                <FormIcon 
                    style={{left: '28%'}}
                    twoPages={false}
                    stepTitle={"Initial Documents"}
                    action={this.iconClicked.bind(this, 'applyforleave')}
                    active={true}
                    order={1}
                    status={this.stepStatus(1)}
                    completed={this.stepCompleted.bind(this)}
                    ready={this.props.isStepReady(1, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'30%'}
                    level={1}
                />
                <FormIcon 
                    style={{left: '58%'}}
                    twoPages={true}
                    stepTitle={"Hearing Documents"}
                    action={this.iconClicked.bind(this, 'leavehearingdocs')}
                    active={true}
                    order={2}
                    status={this.stepStatus(2)}
                    completed={this.stepCompleted.bind(this)}
                    ready={this.props.isStepReady(2, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[1].status === 'completed'}
                    width={'25%'}
                    level={1}
                />
                <GavelEndCircle 
                    style={{position: 'absolute', left: '82%'}}
                    stepTitle={"Decision on Leave to Appeal"}
                    action={this.iconClicked.bind(this, 'decision')}
                    titleStyle={{position: 'absolute', top:'97px', width: '150px', left: '-17px'}}
                    active={true}
                    completed={this.state.steps[1].status === 'completed'}
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
        this.setState({steps: steps},this.props.createOrUpdateJourney(this.state.steps,JOURNEY_TYPE.JOURNEY_TYPE_APPELLANT_LEAVE_REQUIRED, this.setId.bind(this)));
    }
    
    setId(id) {
        this.setState({id:id})
    }
}
export default AppellantApplyForLeaveJourneyMap;
