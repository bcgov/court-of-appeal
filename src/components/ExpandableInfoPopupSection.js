import React, { Component } from 'react';
import './infopopup.css';
import InfoPopupIcon from "./InfoPopupIcon";
import Deadline from './infopopups/Deadline';

class ExpandableInfoPopupSection extends Component {

    constructor(props) {
        super(props);
        this.state= this.initialState(props.expanded);
        this.initialState= this.initialState.bind(this);
        this.toggleSection = this.toggleSection.bind(this);
    }

    componentWillUnmount() {
        this.setState(this.initialState());
    }

    render() {

        let verticalLine = null, helpSection = null;
        if (this.props.lineHeight) {
            verticalLine = (
                <div className="col col-lg-1 col-md-1 col-sm-1">
                    <div className="vertical-line" style={{height: this.props.lineHeight}}/>
                </div>
            );
        }

        let listContent= this.props.getListContent(this.props.contentMap);

        if (this.props.helpSection) {
            helpSection = (
                <div>
                    <div className="row ">
                        <div style={{fontWeight: "bolder", marginBottom: '20px', paddingTop: '20px'}}
                             className="col col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 ">
                            Need help completing a document?
                        </div>
                    </div>
                    <div className="row ">
                        <div
                            className="col col-lg-3 col-lg-offset-1 col-md-3 col-md-offset-1 col-sm-3 col-sm-offset-1 vertical-divider">
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
        let sectionClassName = "col col-lg-11 col-md-11 col-sm-11 info-modal-details ";
        let collapsedSectionClassName = "row ";

        if (!this.props.last) {
            sectionClassName += "info-modal-divider"
            collapsedSectionClassName += "info-modal-divider";
        }

        let deadline = null;
        if (this.props.deadline) {
            deadline = <Deadline
                        deadlinePhrase={this.props.deadlinePhrase}
                        deadline={this.props.deadline}
                />
        }

        return (
            <div className="info-modal-section ">
                <div className="row">
                    <InfoPopupIcon
                        iconSrc={this.props.iconSrc}
                        iconClass={this.props.iconClass}
                    />
                    <div className={this.state.promptClass}>
                        <div className={collapsedSectionClassName}>
                            <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading ">
                                {this.props.sectionHeading}
                            </div>
                            <div className="col col-lg-3 col-md-3 toggle-expansion-button" onClick={this.toggleSection}>
                                <i className="fa fa-plus" />
                            </div>
                        </div>
                    </div>
                    <div className={this.state.replacementHeadingClass}>
                        <div className="row ">
                            <div className=" col col-lg-9 col-md-9 col-sm-9" >
                                <div className="info-modal-section-heading">
                                    {this.props.sectionHeading}
                                 </div>
                            </div>
                            <div className="col col-lg-3 col-md-3 col-sm-3 toggle-expansion-button" onClick={this.toggleSection}>
                                <i className="fa fa-minus" />
                            </div>
                        </div>
                        <div className="row ">
                            <div className=" col col-lg-12 col-md-12 col-sm-12" >
                                {deadline}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={this.state.detailsClass}>
                    {verticalLine}
                    <div className={sectionClassName}>
                        {listContent}
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

    initialState(expandIt) {
        if (expandIt) {
            return {
                promptClass: "col col-lg-11 col-md-11 content-hidden",
                replacementHeadingClass: "col col-lg-11 col-md-11 content-showing",
                detailsClass: "row content-showing",
                expanded: true
            };
        } else {
            return {
                promptClass: "col col-lg-11 col-md-11 content-showing",
                replacementHeadingClass: "col col-lg-11 col-md-11 content-hidden",
                detailsClass: "row content-hidden",
                expanded: false
            };
        }
    }
}
export default ExpandableInfoPopupSection;