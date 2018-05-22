import React from 'react';
import ReactTooltip from 'react-tooltip';

class FormButtonBar extends React.Component {

    render() {
        return (
            <div className="button-bar not-printable">
                {this.backButton()}
                {this.cancelButton()}
                {this.saveButton()}
                {this.viewInFullPage()}
                {this.previewButton()}
                {this.submitButton()}
                {this.continueButton()}
                {this.printButton()}
                <ReactTooltip/>
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
            button =  (
                <div >
                    <button id="back" onClick={this.props.back} className="btn btn-warning">&lt; {backMessage}
                    </button>
                </div>
            );
        };
        return button;
    }

    cancelButton() {
        let button = null;
        if (this.props.cancel) {
            button =  (
                <div>
                    <button id="cancel" onClick={this.props.cancel} className="btn btn-warning">Cancel
                    </button>
                </div>
            );
        };
        return button;
    }

    saveButton() {
        let button = null;
        if (this.props.save) {
            button =  (
                <div>
                    <button id="draft" onClick={this.props.save} className="btn btn-success">Save as Draft
                    </button>
                </div>
            );
        };
        return button;
    }

    viewInFullPage() {
        let button = null;
        if (this.props.fullpage) {
            button =  (
                <div>
                    <button id="save-as-draft" onClick={this.props.fullpage} className="btn btn-success">View in full page
                    </button>
                </div>
            );
        };
        return button;
    }

    previewButton() {
        let button = null;
        if (this.props.preview) {
            button =  (
                <div data-tip={this.props.formErrorMessage}>
                    <button
                        id="preview"
                        onClick={this.props.preview}
                        className="btn btn-success"
                        disabled={this.props.disablePreview}
                    >Preview &gt;
                    </button>
                </div>
            );
        };
        return button;
    }

    submitButton() {
        let button = null;
        if (this.props.submit) {
            button =  (
                <div  data-tip={this.props.formErrorMessage}>
                    <button
                        id="submit"
                        onClick={this.props.submit}
                        className="btn btn-success"
                        disabled={this.props.disableSubmit}
                    >Submit
                    </button>
                </div>
            );
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
            button = (
                <div>
                    <button id="submit" onClick={this.props.continue} className="btn btn-success">{continueMessage}
                    </button>
                </div>
            );
        }
        return button;
    }

    print() {
        window.print();
    }
    printButton() {
        let button = null;
        if (this.props.printable === "yes") {
            button =  (
                <div>
                    <button
                        id="print"
                        onClick={this.print}
                        className="btn btn-success"
                    >Print
                    </button>
                </div>
            );
        };
        return button;
    }

} export default FormButtonBar;