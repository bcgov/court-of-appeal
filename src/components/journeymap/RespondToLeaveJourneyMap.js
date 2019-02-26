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
                    <PageIcon style={{height: '100px'}}
                              className={"journey-box p1"}
                              twoPages={false}
                              stepTitle={"Notice of Appearance"}
                              action={this.iconClicked.bind(this, 'appearance')}
                    />
                    <PageIcon style={{height: '100px'}}
                              className={"journey-box p2"}
                              twoPages={false}
                              stepTitle={"Reply Book"}
                              action={this.iconClicked.bind(this, 'replybook')}
                    />
                    <GavelIcon style={{height: '100px'}}
                              className={"journey-box p3"}
                              twoPages={true}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondentleavetoappealhearing')}
                    />
                </div>
                <ClockEndCircle
                    stepTitle={"Decision on Leave to Appeal"}
                    action={this.iconClicked.bind(this, 'respondentdecision')}
                />
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToLeaveJourneyMap;
