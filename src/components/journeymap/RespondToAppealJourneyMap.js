import React from 'react';
import PageIcon from './PageIcon';
import GavelIcon from './GavelIcon';
let cn = require('classnames');

class RespondToAppealJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left:'20%'}}
                              twoPages={false}
                              stepTitle={"Notice of Appearance"}
                              action={this.iconClicked.bind(this, 'appearance')}
                              active={true}
                    />
                    <PageIcon style={{left:'45%'}}
                              twoPages={false}
                              stepTitle={"Notice of Cross Appeal"}
                              stepTitleOptional={"(optional)"}
                              action={this.iconClicked.bind(this, 'crossappeal')}
                              active={true}
                    />
                    <PageIcon style={{left:'70%', top: '30px'}}
                              twoPages={true}
                              stepTitle={"Factum and Appeal Book"}
                              action={this.iconClicked.bind(this, 'respondentfactum')}
                              active={true}
                              twoPageClassName={"l1"}
                    />
                </div>
                <div className={"journey-right-curve"} />
                <div className={"journey-left-curve"} />
                <div className={"journey-trail-l2-l3"} >
                    <GavelIcon style={{top:'75%', left: '30%'}}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondenthearing')}
                              active={true}
                    />
                    <PageIcon style={{top:'75%', left: '50%'}}
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
export default RespondToAppealJourneyMap;
