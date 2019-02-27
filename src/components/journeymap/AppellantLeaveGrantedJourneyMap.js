import React from 'react';
import PageIcon from './PageIcon';
import GavelIcon from './GavelIcon';
import CalendarIcon from './CalendarIcon'
let cn = require('classnames');

class AppellantLeaveGrantedJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left:'20%'}}
                              twoPages={true}
                              stepTitle={"Appeal Record and Transcript"}
                              action={this.iconClicked.bind(this, 'appealrecord')}
                              active={true}
                    />
                    <PageIcon style={{left:'50%'}}
                              twoPages={true}
                              stepTitle={"Factum, Appeal Book and Certificate of Readiness"}
                              stepTitleClass={"step-title-wide"}
                              action={this.iconClicked.bind(this, 'factum')}
                              active={true}
                    />
                    <CalendarIcon style={{left:'80%', top: '30px'}}
                              stepTitle={"Book Appeal Date with Registry"}
                              action={this.iconClicked.bind(this, 'bookappeal')}
                              active={true}
                    />
                </div>
                <div className={"journey-right-curve"} />
                <div className={"journey-left-curve"} />
                <div className={"journey-trail-l2-l3"} >
                    <PageIcon style={{top:'75%', left: '20%'}}
                              twoPages={false}
                              stepTitle={"Notice of Hearing"}
                              action={this.iconClicked.bind(this, 'noticeofhearing')}
                              active={true}
                    />
                    <GavelIcon style={{top:'75%', left: '43%'}}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'appellanthearing')}
                              active={true}
                    />
                    <PageIcon style={{top:'75%', left: '65%'}}
                              twoPages={false}
                              stepTitle={"Court Order"}
                              stepTitleOptional={"(if applicable)"}
                              stepTitleClass={"step-title-wide"}
                              action={this.iconClicked.bind(this, 'appellantcourtorder')}
                              active={true}
                    />
                    <div className={"journey-end-circle"} onClick={this.iconClicked.bind(this,'appellantcomplete')} >
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
export default AppellantLeaveGrantedJourneyMap;
