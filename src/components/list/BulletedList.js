import React, { Component } from 'react';
import BulletRow from "./BulletRow";

class BulletedList extends Component {

    render() {
        let heading = <div>{this.props.index} .&nbsp;&nbsp; {this.props.heading}</div>;
        let bulletList = this.props.rows.map((row, bulletIndex) => {
            return <BulletRow row={row} key={bulletIndex + "-" + this.props.index} />;
        });

        return (
            <div key={"list" + this.props.index}>
                {heading}
                {bulletList}
            </div>

        );
    }

} export default BulletedList;