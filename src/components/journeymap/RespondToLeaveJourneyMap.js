import React from 'react';
import FormIcon from './journeyicons/FormIcon'
import GavelIcon from './journeyicons/GavelIcon'
import ClockEndCircle from "./journeyicons/ClockEndCircle";
import Trail from "./Trail";
let cn = require('classnames')
let JOURNEY_TYPE = require('../../helpers/constants')

class RespondToLeaveJourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.journey ? props.journey.id : null,
            userid: props.journey ? props.journey.userid : null,
            steps: props.journey && props.journey.steps ? JSON.parse(props.journey.steps) : [
                {status: props.case ? props.case.status.toLowerCase() : 'new', type: 'form-2'},
                {status: 'new', type: 'file'},
                {status: 'new', type: 'hearing'},
            ],
            case: props.case
        };
        this.updateStepStatus = this.updateStepStatus.bind(this);
        this.getStepStatus = this.getStepStatus.bind(this);
    }

    componentDidMount() {
        if (this.props.case) {
            this.updateStepStatus(1, this.props.case.status.toLowerCase())
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
                    width={'18%'}
                    level={1}
                />
                <FormIcon style={{left: '20%'}}
                          twoPages={false}
                          stepTitle={"Notice of Appearance"}
                          action={this.iconClicked.bind(this, 'appearance')}
                          active={true}
                          order={1}
                          status={this.getStepStatus(1)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(1, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'21%'}
                    level={1}
                />
                <FormIcon style={{left: '42%'}}
                          twoPages={false}
                          stepTitle={"Reply Book"}
                          action={this.iconClicked.bind(this, 'replybook')}
                          active={true}
                          order={2}
                          status={this.getStepStatus(2)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(2, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[1].status === 'completed'}
                    width={'21%'}
                    level={1}
                />
                <GavelIcon style={{left: '64%', marginTop: '2px'}}
                           stepTitle={"The Hearing"}
                           action={this.iconClicked.bind(this, 'respondentleavetoappealhearing')} 
                           active={true}
                           order={3}
                           status={this.getStepStatus(3)}
                           completed={this.stepCompleted.bind(this)}
                           ready={this.props.isStepReady(3, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[2].status === 'completed'}
                    width={'20%'}
                    level={1}
                />
                 <ClockEndCircle style={{position: 'absolute', left: '82%'}}
                                 className={cn("any-icon", {"completed-step": this.state.steps[2].status === 'completed'})}
                          stepTitle={"Decision on Leave to Appeal"}
                          action={this.iconClicked.bind(this, 'respondentdecision')}
                          titleStyle={{position: 'absolute' , width: '150px', left: '-17px', top: '97px'}}
                          active={true}
                 />
            
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }

    getStepStatus(stepNumber) {
        return this.state.steps[stepNumber - 1].status;
    }

    updateStepStatus(stepNumber, newStatus){
        let steps = this.state.steps;
        steps[stepNumber - 1].status = newStatus;
        this.setState({steps: steps}, this.props.createOrUpdateJourney(this.state.steps,JOURNEY_TYPE.JOURNEY_TYPE_RESPOND_TO_NOTICE_OF_LEAVE, this.setId.bind(this)));
    }

    stepCompleted(stepNumber, isComplete) {
        this.updateStepStatus(stepNumber, isComplete ? 'completed' : 'new');
    }

    setId(id) {
        this.setState({id:id})
    }
}
export default RespondToLeaveJourneyMap;
