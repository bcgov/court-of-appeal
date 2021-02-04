import React, {Component} from 'react';

class Deadline extends Component {

    render() {
        let deadlineContent = this.props.deadlinePhrases.map((value, key) => {
            return(
                <span key={key}>
                    {value.startWith}
                    <span className="deadline-quantity"> {value.deadline}</span>
                    {value.endWith}
                </span>
            );
        });

        return (

            <div className="deadline ">
                <i className=" oi oi-warning deadline-alert" />
                <div className="deadline-statement">
                    {deadlineContent}
                </div>

            </div>

        );

    }
} export default Deadline;
