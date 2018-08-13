import React, { Component } from 'react';
import './infopopup.css';
import InfoPopupIcon from "./InfoPopupIcon";
import Deadline from './Deadline';

class InfoPopupSection extends Component {

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

        let deadline = null;
        if (this.props.deadlinePhrases) {
            deadline = <Deadline
                deadlinePhrases={this.props.deadlinePhrases}
            />
        }

        let toggleButton = null;
        if (this.props.expandable) {
            toggleButton =
                <div className="col col-lg-2 col-md-2 toggle-expansion-button" >
                    <i className={this.state.toggleIconClass} />
                </div>;
        } else {
            toggleButton = <div className="col col-lg-3 col-md-3 toggle-expansion-button" />
        }

        let verticalLine = null;
        if (this.props.lineHeight) {
            verticalLine = (
                <div className="vertical-line" style={{height: this.props.lineHeight}}/>
            );
        }

        let listContent, paragraphContent;
        if (this.props.getListContent) {
            listContent= this.props.getListContent(this.props.listContentMap);
        }
        if ( this.props.getContent) {
            paragraphContent = this.props.getContent(this.props.paragraphContentMap);
        }

        let sectionDivider = (<div className="info-modal-divider"/>);
        if (this.props.infoModalDivider === false) {
            sectionDivider = null;
        }
        let iconLine = (
            <div className="row" onClick={this.toggleSection} style={{ cursor:'pointer' }}>
                <InfoPopupIcon
                    iconSrc={this.props.iconSrc}
                    iconClass={this.props.iconClass}
                />
                <div className="col">
                    <div className="row">
                        <div className="col col-lg-9 col-md-9 col-sm-9 info-modal-section-heading">
                            {this.props.sectionHeading}
                        </div>
                        {toggleButton}
                    </div>
                </div>
            </div>
        );
        if (this.props.iconLine === false) {
            iconLine = null;
        }
        return (
            <div className="info-modal-section ">
                {iconLine}
                <div className={this.state.collapsibleClass}>
                    <div className="col col-lg-1 col-md-1 col-sm-1">
                        {verticalLine}
                    </div>
                    <div className=" col col-lg-11 col-md-11 col-sm-11" >
                        <div className="row">
                            <div className=" col col-lg-12 col-md-12 col-sm-12">
                                {deadline}
                            </div>
                            <div className="ccol col-lg-12 col-md-12 col-sm-12 info-modal-details">
                                {paragraphContent}
                                {listContent}
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                {sectionDivider}
            </div>
        );
    }

    toggleSection() {

        this.setState((prevState, props) => {
            if(prevState.expanded) {
                return {
                    expanded:false,
                    collapsibleClass: prevState.collapsibleClass.replace("content-showing", "content-hidden"),
                    toggleIconClass: "fa fa-plus"
                }
            } else {
                return {
                    expanded: true,
                    collapsibleClass: prevState.collapsibleClass.replace("content-hidden", "content-showing"),
                    toggleIconClass: "fa fa-minus"

                }
            }
        });

    }

    initialState(expandIt) {

        if (expandIt) {
            return {
                collapsibleClass: "row content-showing",
                expanded: true,
                toggleIconClass: "fa fa-minus"
            };
        } else {
            return {
                collapsibleClass: "row content-hidden",
                expanded: false,
                toggleIconClass: "fa fa-plus"
            };
        }
    }
}
export default InfoPopupSection;