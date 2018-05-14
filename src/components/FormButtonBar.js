import React from 'react';

class FormButtonBar extends React.Component {

    render() {
        return (
            <div className="button-bar">
                {this.backButton()}
                {this.cancelButton()}
                {this.saveButton()}
                {this.viewInFullPage()}
                {this.previewButton()}
                {this.submitButton()}
                {this.continueButton()}
            </div>
        );
    }

    backButton() {
        let button = null;
        let backMessage = this.props.backMessage;
        if (!backMessage) {
            backMessage = "Back";
        }
        if (this.props.back) {
            button =  <button id="back" onClick={this.props.back} className="btn btn-warning">&lt; {backMessage}
            </button>;
        };
        return button;
    }

    cancelButton() {
        let button = null;
        if (this.props.cancel) {
            button =  <button id="cancel" onClick={this.props.cancel} className="btn btn-warning">Cancel
            </button>;
        };
        return button;
    }

    saveButton() {
        let button = null;
        if (this.props.save) {
            button =  <button id="draft" onClick={this.props.save} className="btn btn-success">Save as Draft
            </button>;
        };
        return button;
    }

    viewInFullPage() {
        let button = null;
        if (this.props.fullpage) {
            button =  <button id="save-as-draft" onClick={this.props.fullpage} className="btn btn-success">View in full page
            </button>;
        };
        return button;
    }

    previewButton() {
        let button = null;
        if (this.props.preview) {
            button =  <button
                id="preview"
                onClick={this.props.preview}
                className="btn btn-success"
                disabled={this.props.disablePreview}
            >Preview &gt;
            </button>;
        };
        return button;
    }

    submitButton() {
        let button = null;
        if (this.props.submit) {
            button =  <button
                id="submit"
                onClick={this.props.submit}
                className="btn btn-success"
                disabled={this.props.disableSubmit}
            >Submit
            </button>;
        };
        return button;
    }

    continueButton() {
        let button = null;
        if (this.props.continue) {
            let continueMessage = this.props.continueMessage;
            if (!continueMessage) {
                continueMessage = "Continue";
            }
            button = <button id="submit" onClick={this.props.continue} className="btn btn-success">{continueMessage}
            </button>;
        }
        return button;
    }

} export default FormButtonBar;