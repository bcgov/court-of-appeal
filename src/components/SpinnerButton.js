import React from 'react';

class SpinnerButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            downloading: false
        }
        this.buttonOrSpinner = this.buttonOrSpinner.bind(this);
    }
    startSpinner() {
        this.setState({ downloading:true })
    }
    stopSpinner() {
        this.setState({ downloading:false })
    }
    buttonOrSpinner() {
        if (this.state.downloading) {
            return (
                <button id={this.props.id} 
                        disabled="true" 
                        className="btn btn-primary btn-green" 
                        style={{ width:this.props.width+'px' }}
                >
                    <i className="fa fa-spinner fa-spin"></i>
                </button>
            )
        }
        else {
            return (
                <button id={this.props.id} 
                        onClick={this.props.onClick} 
                        className="btn btn-primary round-borders action-button"
                        style={{ width:this.props.width+'px' }}
                >
                        { this.props.content }
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                { this.buttonOrSpinner() }
            </div>
        );
    }
}

export default SpinnerButton