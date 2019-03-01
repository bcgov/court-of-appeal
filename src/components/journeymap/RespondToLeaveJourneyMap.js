import React from 'react';
import PageIcon from './PageIcon'
import GavelIcon from './GavelIcon'
import ClockEndCircle from "./ClockEndCircle";

class RespondToLeaveJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left: '20%'}}
                              twoPages={false}
                              stepTitle={"Notice of Appearance"}
                              action={this.iconClicked.bind(this, 'appearance')}
                              active={true}
                    />
                    <PageIcon style={{left: '45%'}}
                              twoPages={false}
                              stepTitle={"Reply Book"}
                              action={this.iconClicked.bind(this, 'replybook')}
                              active={true}
                    />
                    <GavelIcon style={{left: '69%'}}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondentleavetoappealhearing')} 
                              active={true}
                    />
                     <ClockEndCircle style={{position: 'absolute', left: '90%', top: '-10%'}}
                              stepTitle={"Decision on Leave to Appeal"}
                              action={this.iconClicked.bind(this, 'respondentdecision')}
                              titleStyle={{position: 'absolute', top:'143px', width: '150px', left: '-17px'}}
                              active={true}
                     />
                </div>
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToLeaveJourneyMap;
