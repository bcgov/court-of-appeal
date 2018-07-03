import React, {Component} from 'react';

class Deadline extends Component {

    render() {
        return (
            <div className="deadline">
                <i className="fa fa-exclamation-triangle deadline-alert" />

                {this.props.deadlinePhrase.startWith}
                <div className="deadline-quantity"> {this.props.deadline} </div>
                {this.props.deadlinePhrase.endWith}

            </div>
        );

    }
} export default Deadline;