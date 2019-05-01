import React from 'react';
import FormIcon from './journeyicons/FormIcon';
import CalendarIcon from './journeyicons/CalendarIcon';
import GavelIcon from './journeyicons/GavelIcon';
import EndCircle from './journeyicons/EndCircle';
import Trail from './Trail';
import ReturnTrail from "./ReturnTrail";
let cn = require('classnames');
let JOURNEY_TYPE = require('../../helpers/constants');

class AppellantRightToAppealJourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.journey ? props.journey.id : null,
            userid: props.journey ? props.journey.userid : null,
            steps: props.journey ? JSON.parse(props.journey.steps) : [
                {status: 'new', type: 'appellantintial'},
                {status: 'new', type: 'appealrecord'},
                {status: 'new', type: 'factum'},
                {status: 'new', type: 'bookappeal'},
                {status: 'new', type: 'noticeofhearing'},
                {status: 'new', type: 'appellanthearing'},
                {status: 'new', type: 'appellantcourtorder'}],
            case: props.case
        }
    }
    
    render() {
        return (
            <div className={"journey-map-container"}>
                <div className={cn("journey-start-circle", {"completed-step": this.state.steps[0].status !== 'new'})} />
               <div
                   style={{marginLeft: '50px',
                       borderTop: '9px solid rgb(159, 191, 226)',
                       width: '65%',
                       position: 'absolute',
                       top: '92px',
                       zIndex: '1'
                   }}/>
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[0].status !== 'new'}
                    width={'25%'}
                    level={1}
               />
                <FormIcon style={{left: '30%'}}
                          twoPages={false}
                          stepTitle={"Initial Documents"}
                          action={this.iconClicked.bind(this, 'appellantinitial')}
                          active={true}
                          order={1}
                          status={this.stepStatus(1)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(1, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[0].status === 'completed'}
                    width={'32%'}
                    level={1}
                />
                <FormIcon style={{left: '60%'}}
                          twoPages={true}
                          stepTitle={"Appeal Record and Transcript"}
                          stepTitleClass={"step-title-wide"}
                          action={this.iconClicked.bind(this, 'appealrecord')}
                          active={true}
                          order={2}
                          status={this.stepStatus(2)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(2,this.state.steps)}
                />
                <ReturnTrail
                    priorstep={this.state.steps[1]}
                    startpoint={'68%'}
                />
                <div
                    style={{marginLeft: '204px',
                        borderTop: '9px solid rgb(159, 191, 226)',
                        width: '53%',
                        position: 'absolute',
                        top: '374px',
                        zIndex: '1',
                        marginBottom: '81px'
                    }}/>
                <FormIcon style={{left: '24%', top: '46%'}}
                          twoPages={true}
                          stepTitle={"Factum, Appeal Book, and Certificate of Readiness"}
                          action={this.iconClicked.bind(this, 'factum')}
                          stepTitleClass={"step-title-wide"}
                          active={true}
                          order={3}
                          status={this.stepStatus(3)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(3, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[2].status === 'completed'}
                    width={'27%'}
                    style={{top: '46%', left: '25%', position: 'absolute'}}
                    level={2}
                />
                <CalendarIcon style={{left: '46%', top: '46%'}}
                              stepTitle={"Book Appeal Date with Registry"}
                              stepTitleClass={"step-title-wide"}
                              action={this.iconClicked.bind(this, 'bookappeal')}
                              active={true}
                              order={4}
                              status={this.stepStatus(4)}
                              completed={this.stepCompleted.bind(this)}
                              ready={this.props.isStepReady(4, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[3].status === 'completed'}
                    width={'27%'}
                    style={{top: '46%', left: '50%', position: 'absolute'}}

                    level={2}
                />
                 <FormIcon style={{left: '70%', top: '46%'}}
                           twoPages={false}
                           stepTitle={"Notice of Hearing"}
                           action={this.iconClicked.bind(this, 'noticeofhearing')}
                           active={true}
                           order={5}
                           status={this.stepStatus(5)}
                           completed={this.stepCompleted.bind(this)}
                           ready={this.props.isStepReady(5, this.state.steps)}
                 />
                <ReturnTrail
                    priorstep={this.state.steps[4]}
                    top={'117px'}
                    startpoint={'71%'}
                />
                 <div
                     style={{marginLeft: '204px',
                         borderTop: '9px solid rgb(159, 191, 226)',
                         width: '62%',
                         position: 'absolute',
                         top: '91%',
                         zIndex: '1',
                         marginBottom: '81px'
                     }}/>
                <GavelIcon style={{left: '24%', top: '82%'}}
                           className={"journey-box"} 
                           stepTitle={"The Hearing"} 
                           action={this.iconClicked.bind(this, 'appellanthearing')}
                           active={true}
                           order={6}
                           status={this.stepStatus(6)}
                           completed={this.stepCompleted.bind(this)}
                           ready={this.props.isStepReady(6, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[5].status === 'completed'}
                    width={'35%'}
                    style={{top: '85.05%', left: '25%', position: 'absolute'}}
                    level={3}
                />
                <FormIcon style={{left: '54%', top: '84.7%'}}
                          className={"journey-box"}
                          twoPages={false}
                          stepTitle={"Court Order"}
                          action={this.iconClicked.bind(this, 'appellantcourtorder')}
                          active={true}
                          order={7}
                          status={this.stepStatus(7)}
                          completed={this.stepCompleted.bind(this)}
                          ready={this.props.isStepReady(7, this.state.steps)}
                />
                <Trail
                    className={"journey-trail-l1-moveable"}
                    completed={this.state.steps[6].status === 'completed'}
                    width={'33%'}
                    style={{top: '85.05%', left: '58%', position: 'absolute', marginBottom: '100px'}}
                    level={3}
                />
                <EndCircle
                    stepTitle={"Appeal Process Complete"}
                    action={this.iconClicked.bind(this,'appellantcomplete')}
                    active={true}
                    completed={this.state.steps[6].status === 'completed'}
                    style={{top: '84.7%', left: '82%'}}
                    
                />
            </div>
        );
    }
    
    iconClicked(action) {
        this.props.iconClicked(action)
    }
    stepStatus(stepNumber) {
        return this.state.steps[stepNumber - 1].status;
    }

    stepCompleted(stepNumber, isComplete) {
        let steps = this.state.steps;
        steps[stepNumber - 1].status = isComplete ? 'completed' : 'new';
        this.setState({steps: steps}, this.props.createOrUpdateJourney(this.state.steps,JOURNEY_TYPE.JOURNEY_TYPE_APPELLANT_RIGHT_TO_APPEAL, this.setId.bind(this)));
    }

    setId(id) {
        this.setState({id:id})
    }
}
export default AppellantRightToAppealJourneyMap;
