import React from 'react';
import PageIcon from './PageIcon'

class RespondToAppealJourneyMap extends React.Component {
    
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
                              stepTitle={"Notice of Cross Appeal"}
                              action={this.iconClicked.bind(this, 'crossappeal')}
                    />
                    <PageIcon style={{height: '100px'}}
                              className={"journey-box p3"}
                              twoPages={true}
                              stepTitle={"Factum and Appeal Book"}
                              action={this.iconClicked.bind(this, 'respondentfactum')}
                    />
                </div>
                <div className={"journey-right-curve"} />
                <div className={"journey-left-curve"} />
                <div className={"journey-trail-l2-l3"} >
                    <PageIcon style={{height: '100px'}}
                              className={"journey-box p4"}
                              twoPages={false}
                              stepTitle={"The Hearing"}
                              action={this.iconClicked.bind(this, 'respondenthearing')}
                    />
                    <PageIcon style={{height: '100px'}}
                              className={"journey-box p5"}
                              twoPages={false}
                              stepTitle={"Court Order"}
                              action={this.iconClicked.bind(this, 'courtorder')}
                    />
                </div>
                <div className={"journey-end-circle"} >
                    <div className={"oi oi-check journey-final-check"}/>
                </div>
                
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
}
export default RespondToAppealJourneyMap;
