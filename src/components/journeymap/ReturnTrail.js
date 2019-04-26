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
                     style={{
                         position: 'absolute',
                         top: '56px',
                         left: '67px',
                         zIndex: '10'
                     }}
                     circling={this.props.priorstep.status === 'completed'}
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
                    completed={this.props.priorstep.status === 'completed'}
                    width={'75%'}
                    circling={this.props.priorstep.status === 'completed'}
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
                    style={{position: 'absolute',
                        left: this.props.startpoint || '73%',
                        top: '-115px'}}
                    circling={this.props.priorstep.status === 'completed'}
                />

            </div>
        )
    }
}
export default ReturnTrail;
