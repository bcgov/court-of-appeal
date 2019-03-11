import React from 'react';
import PageIcon from './PageIcon';
import GavelIcon from './GavelIcon';
import Trail from './Trail'
let cn = require('classnames');

class RespondToAppealJourneyMap extends React.Component {
    
    //todo: journey should save journeymap state
    
    constructor(props) {
        super(props);
        this.state = {
            steps: [
                {status: props.case ? props.case.status.toLowerCase() : 'new', type: 'form2'},
                {status: 'new', type: 'package'},
                {status: 'new', type: 'file'},
                {status: 'new', type: 'hearing'},
                {status: 'new', type: ''}],
            case: props.case
        }
        console.log("props.case", props.case)
    }
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={cn("journey-start-circle", {"completed-step": this.state.steps[0].status !== 'new'})} />
                <Trail
                    className={"journey-trail-l1"}
                    completed={this.state.steps[0].status !== 'new'}
                    width={'18%'}
                    level={1}
                />
                    
                <PageIcon style={{left:'20%'}}
                          twoPages={false}
                          stepTitle={"Notice of Appearance"}
                          action={this.iconClicked.bind(this, 'appearance')}
                          active={true}
                          order={1}
                          status={this.stepStatus(1)}
                          completed={this.stepCompleted.bind(this)}
                />
                
                <Trail
                    className={"journey-trail-l1"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'27%'}
                    level={1}
                />
                <PageIcon style={{left:'44%' }}
                          twoPages={false}
                          stepTitle={"Notice of Cross Appeal"}
                          stepTitleOptional={"(optional)"}
                          action={this.iconClicked.bind(this, 'crossappeal')}
                          active={true}
                          order={2}
                          status={this.stepStatus(2)}
                          completed={this.stepCompleted.bind(this)}
                    />
                
               <Trail
                   className={"journey-trail-l1"}
                   completed={this.state.steps[1].status === 'completed'}
                   width={'27%'}
                   level={1}
               />
                <PageIcon style={{left:'68%'}}
                          twoPages={true}
                          stepTitle={"Factum and Appeal Book"}
                          action={this.iconClicked.bind(this, 'respondentfactum')}
                          active={true}
                          order={3}
                          status={this.stepStatus(3)}
                          completed={this.stepCompleted.bind(this)}
                />
                <Trail
                    className={"journey-trail-l1"}
                    completed={this.state.steps[2].status === 'completed'}
                    width={'5%'}
                    level={1}
                />
                <div className={cn("journey-right-curve",{'completed-curve': this.state.steps[2].status === 'completed'})} />
                <div className={cn("journey-left-curve",{'completed-curve': this.state.steps[2].status === 'completed'})} />
                <div className={"journey-trail-l2-l3"} >
                    <GavelIcon style={{top:'70%', left: '30%'}}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondenthearing')}
                              active={true}
                               order={4}
                               status={this.stepStatus(4)}
                               
                    />
                    <PageIcon style={{top:'70%', left: '50%'}}
                              twoPages={false}
                              stepTitle={"Court Order"}
                              stepTitleOptional={"(if required)"}
                              action={this.iconClicked.bind(this, 'courtorder')}
                              active={true}
                              order={5}
                              status={this.stepStatus(5)}
                              completed={this.stepCompleted.bind(this)}
                    />
                    <div className={"journey-end-circle journey-end-circle-l2"} onClick={this.iconClicked.bind(this,'respondentcomplete')} >
                    <div className={"oi oi-check journey-final-check"}/>
                    <div className={cn("end-step-title", "end-step-title-l2")}>
                        <span>"Appeal Process Complete"</span>
                    </div>
                </div>
                </div>
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
        this.setState({steps: steps});
    }
}
export default RespondToAppealJourneyMap;
