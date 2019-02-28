import React from 'react';
import PageIcon from './PageIcon'
import GavelIcon from './GavelIcon'
import ClockEndCircle from "./ClockEndCircle";

class RespondToLeaveRefusedJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left: '25%'}}
                              twoPages={true}
                              stepTitle={"Application for Review"}
                              active={true}
                              action={this.iconClicked.bind(this, 'replybook')}
                    />
                    <GavelIcon style={{left: '59%'}}
                              stepTitle={"The Hearing"}
                              active={true} 
                              action={this.iconClicked.bind(this, 'respondentappealhearing')}
                    />
                     <ClockEndCircle style={{position: 'absolute', left: '90%', top: '-10%'}}
                              stepTitle={"Final Decision on Leave to Appeal"}
                              titleStyle={{position: 'absolute', top:'143px', width: '150px', left: '-25px'}}
                              active={true}
                              action={this.iconClicked.bind(this, 'respondentfinaldecision')}
                     />
                </div>
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToLeaveRefusedJourneyMap;
