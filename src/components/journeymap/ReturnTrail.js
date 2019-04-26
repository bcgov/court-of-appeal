import React, { Component } from 'react';
import RightTurn from "./RightTurn";
import LeftTurn from "./LeftTurn";
import Trail from "./Trail";
import './returntrail.css';

class ReturnTrail extends Component {


    render() {
        return (
            <div style={{position: 'relative', top: '84px', width:'100%', height: '169px', marginBottom: '80px'}}>
                 <LeftTurn
                     steps={this.props.steps}
                     style={{
                         position: 'absolute',
                         top: '56px',
                         left: '67px',
                         zIndex: '10'
                     }}
                     circling={this.props.steps[2].status === 'completed'}
                 />
                <Trail
                    style={{
                        width: '52%',
                        left: '21%',
                        position: 'absolute',
                        top: '13.5px',
                        zIndex: '11'
                    }}
                    className={"journey-return-trail"}
                    completed={this.props.steps[2].status === 'completed'}
                    width={'75%'}
                    circling={this.props.steps[2].status === 'completed'}
                />
                <Trail
                    style={{
                        width: '52%',
                        left: '21%',
                        position: 'absolute',
                        top: '13.5px',
                        zIndex: '10'
                    }}
                    className={"journey-return-trail"}
                    completed={false}
                    width={'75%'}
                    circling={false}
                />
                <RightTurn
                    steps={this.props.steps}
                    style={{position: 'absolute',
                        left: '73%',
                        top: '-115px'}}
                    circling={this.props.steps[2].status === 'completed'}
                />

            </div>
        )
    }
}
export default ReturnTrail;
