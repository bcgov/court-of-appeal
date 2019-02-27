import React from 'react';
import PageIcon from './PageIcon'
import GavelEndCircle from "./GavelEndCircle";

class AppellantApplyForLeaveJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <div className={"journey-trail-l1"} >
                    <PageIcon style={{left: '25%'}}
                              twoPages={false}
                              stepTitle={"Initial Documents"}
                              action={this.iconClicked.bind(this, 'applyforleave')}
                    />
                    <PageIcon style={{left: '55%'}}
                              twoPages={true}
                              stepTitle={"Hearing Documents"}
                              action={this.iconClicked.bind(this, 'leavehearingdocs')}
                    />
                     <GavelEndCircle style={{position: 'absolute', left: '90%', top: '-10%'}}
                              stepTitle={"Decision on Leave to Appeal"}
                              action={this.iconClicked.bind(this, 'decision')}
                              titleStyle={{position: 'absolute', top:'143px', width: '150px', left: '-17px'}}
                     />
                </div>
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default AppellantApplyForLeaveJourneyMap;
