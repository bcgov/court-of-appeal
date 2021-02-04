import React from 'react';
import FormIcon from './journeyicons/FormIcon'
import GavelIcon from './journeyicons/GavelIcon'
import ClockEndCircle from "./journeyicons/ClockEndCircle";
import Trail from "./Trail";

class RespondToLeaveRefusedFinalJourneyMap extends React.Component {
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={"journey-start-circle"} />
               <Trail
                   className={"journey-trail-l1-l2 last-row"}
                   width={'25%'}
                   level={1}
               />
                <FormIcon style={{left: '28%'}}
                          twoPages={true}
                          stepTitle={"Application for Review"}
                          stepTitleClass={"page-step-title-inactive"}
                          active={false}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    width={'31%'}
                    level={1}
                />
                <GavelIcon style={{left: '55%', top: '20%'}}
                           stepTitle={"The Hearing"}
                           active={false}
                />
                <Trail
                    className={"journey-trail-l1-l2 last-row"}
                    width={'25%'}
                    level={1}
                />
                 <ClockEndCircle
                     style={{position: 'absolute', left: '80%'}}
                     stepTitle={"Final Decision on Leave to Appeal"}
                     titleStyle={{position: 'absolute', top:'97px', width: '150px', left: '-25px'}}
                     active={false}
                 />
            </div>
        );
    }
}
export default RespondToLeaveRefusedFinalJourneyMap;
