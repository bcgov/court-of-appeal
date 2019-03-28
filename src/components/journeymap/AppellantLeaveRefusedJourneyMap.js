import React from 'react';
import PageIcon from './PageIcon';
import GavelIcon from './GavelIcon';
import Trail from './Trail';
import ClockEndCircle from "./ClockEndCircle";

class AppellantLeaveRefusedJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    width={'25%'}
                    level={1}
                />
                <PageIcon 
                    style={{left: '25%', top: '16%'}}
                    twoPages={true}
                    stepTitle={"Application for Review"}
                    active={false}
                    stepTitleClass={"page-step-title-inactive"}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    width={'31%'}
                    level={1}
                />
                <GavelIcon 
                    style={{left: '56%', top: '24%'}}
                    stepTitle={"The Hearing"}
                    active={false}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    width={'25%'}
                    level={1}
                />
                 <ClockEndCircle 
                     style={{position: 'absolute', left: '80%', top: '16%'}}
                     stepTitle={"Final Decision on Leave to Appeal"}
                     titleStyle={{position: 'absolute', top: '97px', width: '150px', left: '-30px'}}
                     active={false}
                 />
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default AppellantLeaveRefusedJourneyMap;
