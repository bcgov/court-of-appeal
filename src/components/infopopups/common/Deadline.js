import React, {Component} from 'react';

class Deadline extends Component {

    render() {
        return (
            <div className="deadline ">
                <i className=" fa fa-exclamation-triangle deadline-alert" />
                <div className="deadline-statement">
                    <div>
                        {this.props.deadlinePhrase.startWith}
                        <span className="deadline-quantity"> {this.props.deadline}</span>
                        {this.props.deadlinePhrase.endWith}
                     </div>

                </div>
            </div>
        );

    }
} export default Deadline;