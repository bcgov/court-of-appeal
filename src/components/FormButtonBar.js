import React from 'react';
import ReactTooltip from 'react-tooltip';
import DefaultService from '../service/default.service.js';
import FileSaver from 'file-saver';
import SpinnerButton from './SpinnerButton';

class FormButtonBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            downloading: false
        }
        this.className = "btn btn-primary round-borders";
        this.actionClassName = this.className + " action-button";

        this.print = this.print.bind(this);
    }

    componentDidMount() {
        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
    }

    render() {
        return (
            <div className="button-bar not-printable" ref={ (element)=> {this.element = element }}>
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
                    <button id="back" onClick={this.props.back} className={this.className}><i className="glyphicon glyphicon-triangle-left" /> {backMessage}
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
                    <button id="cancel" onClick={this.props.cancel} className={this.className}>Cancel
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
                    <button id="draft" onClick={this.props.save} className={this.className}>Save as Draft
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
                    <button id="save-as-draft" onClick={this.props.fullpage} className={this.className}>View in full page
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
                        className={this.actionClassName}
                        disabled={this.props.disablePreview}
                    >Preview <i className="glyphicon glyphicon-triangle-right"/>
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
                        className={this.actionClassName}
                        disabled={this.props.disableSubmit}
                    >Submit <i className="glyphicon glyphicon-triangle-right"/>
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
                    <button id="submit" onClick={this.props.continue} className={this.className}>
                        <i className="glyphicon glyphicon-triangle-right" />  {continueMessage}
                    </button>
                </div>
            );
        }
        return button;
    }

    print() {
        this.downloadButton.startSpinner();
        var styles = `
            <style>
                body {
                    padding: 15px;
                }
                body, table {
                    font-size: 8pt;
                }
                #form2-preview {
                    font-family: Myriad-Pro, sans-serif;
                    font-size: 8pt;
                    padding: 5px;
                }                
                #form2-preview td {
                    padding: 5px;
                }
                h2 {
                    font-size: 10pt;
                }
                h3 {
                    font-size: 8pt;
                }
            </style>
        `
        var html = '<html><head>' + styles + '</head><body>' + document.getElementById('form2-preview').outerHTML + '</body></html>';        
        this.service.generatePdf(html, (data)=>{
            this.downloadButton.stopSpinner();
            console.log(data);
            if (!data.error) {                
                var blob = new Blob([data], {type: 'application/pdf'});
                FileSaver.saveAs(blob, 'form.pdf');
            }
        });
    }
    printButton() {
        let button = null;
        if (this.props.printable === "yes") {
            button =  (
                <div>
                    <SpinnerButton id="download-button" width="106" onClick={this.print} ref={ (element)=> {this.downloadButton = element }}
                        content='Download'>                        
                    </SpinnerButton>
                </div>
            );
        };
        return button;
    }

} export default FormButtonBar;