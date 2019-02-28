import React from 'react';
import PageIcon from './PageIcon';
import CalendarIcon from './CalendarIcon';
import GavelIcon from './GavelIcon';
let cn = require('classnames');

class AppellantRightToAppealJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left: '30%'}}
                              twoPages={false}
                              stepTitle={"Appeal Documents"}
                              action={this.iconClicked.bind(this, 'appellantinitial')}
                              active={true}
                    />
                    <PageIcon style={{left: '70%'}}
                              twoPages={false}
                              stepTitle={"Appeal Record and Transcript"}
                              action={this.iconClicked.bind(this, 'appealrecord')}
                              active={true}
                    />
                </div>
                <div className={"journey-right-curve"} />
                <div className={"journey-left-curve"} />
                <div className={"journey-trail-l2-l3"} >
                    <PageIcon style={{left: '20%', top: '53%'}}
                              twoPages={true}
                              stepTitle={"Factum, Appeal Book, and Certificate of Readiness"}
                              action={this.iconClicked.bind(this, 'factum')}
                              stepTitleClass={"step-title-wide"}
                              active={true}
                    />
                    <CalendarIcon style={{left: '45%', top: '53%'}}
                              stepTitle={"Book Appeal Date with Registry"}
                              action={this.iconClicked.bind(this, 'bookappeal')}
                              active={true}
                    />
                     <PageIcon style={{left: '68%', top: '53%'}}
                               twoPages={false}
                               stepTitle={"Notice of Hearing"}
                               action={this.iconClicked.bind(this, 'noticeofhearing')}
                               active={true}
                     />
                </div>
                <div className={"journey-right-curve l2"} />
                <div className={"journey-left-curve l2"} />
                <div className={"journey-trail-l4"} >
                    <GavelIcon style={{left: '30%', top: '79%'}} 
                               className={"journey-box"} 
                               stepTitle={"The Hearing"} 
                               action={this.iconClicked.bind(this, 'appellanthearing')}
                               active={true}
                    />
                    <PageIcon style={{left: '55%', top: '79%'}}
                              className={"journey-box"}
                              twoPages={false}
                              stepTitle={"Court Order"}
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
export default AppellantRightToAppealJourneyMap;
