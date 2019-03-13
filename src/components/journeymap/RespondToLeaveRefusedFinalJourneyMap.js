import React from 'react';
import PageIcon from './PageIcon'
import GavelIcon from './GavelIcon'
import ClockEndCircle from "./ClockEndCircle";
import Trail from "./Trail";
let cn = require("classnames");

class RespondToLeaveRefusedFinalJourneyMap extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            steps: [
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
                <PageIcon style={{left: '28%'}}
                          twoPages={true}
                          stepTitle={"Application for Review"}
                          active={false}
                          order={1}
                          completed={true}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'31%'}
                    level={1}
                />
                <GavelIcon style={{left: '55%'}}
                           stepTitle={"The Hearing"}
                           active={false}
                           order={2}
                           completed={true}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    completed={this.state.steps[1].status === 'completed'}
                    width={'25%'}
                    level={1}
                />
                 <ClockEndCircle
                     style={{position: 'absolute', left: '80%', top: '5%'}}
                     className={cn({"completed-step": this.state.steps[1].status === 'completed'})}
                     stepTitle={"Final Decision on Leave to Appeal"}
                     titleStyle={{position: 'absolute', top:'143px', width: '150px', left: '-25px'}}
                     active={false}
                 />
            
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToLeaveRefusedFinalJourneyMap;
