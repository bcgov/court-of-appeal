import React, { Component } from 'react';
import '../components/infomodal.css';

class ExpandableSection extends Component {

    constructor(props) {
        super(props);
        this.state= this.initialState();
        this.initialState= this.initialState.bind(this);
        this.toggleSection = this.toggleSection.bind(this);
    }

    componentWillUnmount() {
        this.setState(this.initialState());
    }

    render() {
        let verticalLine = null, helpSection = null;
        if (this.props.verticalLine) {
            verticalLine = (
                <div className="col col-lg-1 col-md-1 col-sm-1">
                    <div className="vertical-line" style={this.props.VLProps}/>
                </div>
            );
        }
        if (this.props.helpSection) {
            helpSection = (
                <div>
                    <div className="row ">
                        <div  style={{fontWeight:"bolder",marginBottom:'20px', }} className="col col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 ">
                            Need help completing a document?
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 vertical-divider">
                            <a href={this.props.helpURL}>{this.props.helpURLName}</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-sm-4 vertical-divider info-help-right-cols">
                            <a href="mailto:courts.cso@gov.bc.ca">Email: Courts.cso@gov.bc.ca</a>
                        </div>
                        <div className="col col-lg-4 col-md-4 col-sm-4 info-help-right-cols">
                            Call: 1-800-663-6102
                        </div>
                    </div>
                </div>

            )
        }

        return (
            <div>
                <div className="row">
                    <div className="col col-lg-1 col-md-1 col-sm-1">
                        <div shape="circle" className="info-modal-icon-container">
                            <img src={this.props.iconSrc} className={this.props.iconClass}/>
                        </div>
                    </div>
                    <div className={this.state.promptClass}>
                        <div className="row info-modal-divider">
                            <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading" style={{marginBottom:'20px'}}>
                                {this.props.initialHeading}
                            </div>
                            <div className="col col-lg-3 col-md-3 toggle-expansion-button" onClick={this.toggleSection}>
                                <i className="fa fa-plus" />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.replacementHeadingClass}>
                        <div className="row info-modal-divider">
                            <div className=" col col-lg-9 col-md-9 col-sm-9" >
                                <div className="deadline">{this.props.deadLine}</div>
                                <div className="info-modal-section-heading">{this.props.expandedHeading}</div>
                            </div>
                            <div className="col col-lg-3 col-md-3 col-sm-3 toggle-expansion-button" onClick={this.toggleSection}>
                                <i className="fa fa-minus" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.detailsClass}>
                    {verticalLine}
                    <div className="col col-lg-11 col-md-11 col-sm-11 info-modal-section">
                        {this.props.content}
                        {helpSection}
                    </div>

                </div>
            </div>
        );
    }

    toggleSection() {

        this.setState((prevState, props) => {
            if(prevState.expanded) {
                let promptClassExpanded = prevState.promptClass.replace("content-hidden", "content-showing");

                let detailsCollapsed = prevState.detailsClass.replace("content-showing", "content-hidden");
                return {
                    expanded:false,
                    promptClass: promptClassExpanded,
                    replacementHeadingClass: prevState.replacementHeadingClass.replace("content-showing", "content-hidden"),
                    detailsClass: detailsCollapsed
                }
            } else {
                return {
                    expanded: true,
                    promptClass: prevState.promptClass.replace("content-showing", "content-hidden"),
                    replacementHeadingClass: prevState.replacementHeadingClass.replace("content-hidden", "content-showing"),
                    detailsClass: prevState.detailsClass.replace("content-hidden", "content-showing")
                }
            }
        });

    }

    initialState() {
        return {
            promptClass: "col col-lg-11 col-md-11 content-showing",
            replacementHeadingClass: "col col-lg-11 col-md-11 content-hidden",
            detailsClass: "row content-hidden",
            expanded: false
        };
    }
}
export default ExpandableSection;