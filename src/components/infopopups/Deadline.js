import React, {Component} from 'react';

class Deadline extends Component {

    render() {
        return (
            <div className="row ">
                <div className=" col col-lg-12 col-md-12 col-sm-12" style={{padding: 0}} >
                    <div className="deadline">
                        <i className="fa fa-exclamation-triangle deadline-alert" />

                        {this.props.deadlinePhrase.first}
                        <div className="deadline-quantity"> {this.props.deadline} </div>
                        {this.props.deadlinePhrase.last}

                    </div>
                </div>
            </div>

        );

    }
} export default Deadline;