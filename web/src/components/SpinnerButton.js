import React from 'react';

class SpinnerButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            downloading: false
        };
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
                <div style={{display:'inline-block'}}>
                <button id={this.props.id}
                        disabled={true}
                        className={ 'btn btn-primary btn-green round-borders action-button ' + this.props.addClass }
                        style={{ width:this.props.width+'px' }}
                >
                    <div className="efiling-spinner"></div>
                </button>
                </div>
            )
        }
        else {
            return (
                <div style={{display:'inline-block'}}>
                <button id={this.props.id}
                        onClick={this.props.onClick}
                        className={ 'btn btn-primary round-borders action-button ' + this.props.addClass }
                        style={{ width:this.props.width+'px' }}
                        disabled={this.props.disabled}
                >
                        { this.props.content }
                </button>
                </div>
            )
        }
    }
    render() {
        return this.buttonOrSpinner();
    }
}

export default SpinnerButton
