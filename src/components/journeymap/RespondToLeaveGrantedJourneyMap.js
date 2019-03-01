import React from 'react';
import PageIcon from './PageIcon';
import GavelIcon from './GavelIcon';
let cn = require('classnames');

class RespondToLeaveGrantedJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left:'28%'}}
                              twoPages={false}
                              stepTitle={"Notice of Cross Appeal"}
                              action={this.iconClicked.bind(this, 'crossappeal')}
                              active={true}
                    />
                    <PageIcon style={{left:'65%', top: '30px'}}
                              twoPages={true}
                              stepTitle={"Factum, Appeal Book and Certificate of Readiness"}
                              stepTitleClass={"step-title-wide"}
                              action={this.iconClicked.bind(this, 'respondentfactum')}
                              active={true}
                    />
                </div>
                <div className={"journey-right-curve"} />
                <div className={"journey-left-curve"} />
                <div className={"journey-trail-l2-l3"} >
                    <GavelIcon style={{top:'71%', left: '28%'}}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondenthearing')}
                              active={true}
                    />
                    <PageIcon style={{top:'71%', left: '55%'}}
                              twoPages={false}
                              stepTitle={"Court Order"}
                              stepTitleOptional={"(if required)"}
                              action={this.iconClicked.bind(this, 'courtorder')}
                              active={true}
                    />
                    <div className={"journey-end-circle"} onClick={this.iconClicked.bind(this,'respondentcomplete')} >
                    <div className={"oi oi-check journey-final-check"}/>
                    <div className={cn("end-step-title", "end-step-title-l2")}>
                    {"Appeal Process Complete"}
                    </div>
                </div>
                </div>
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToLeaveGrantedJourneyMap;
