import React, {Component} from 'react';
import '../components/infomodal.css';
import InfoModalSection from './InfoModalSection';
import ExpandableSection from './ExpandableSection';

class InfoModal extends Component {

    render() {

        let sections = this.getSections();

       return (
           <div id="info-modal" className="modal" style={{display: 'block'}} >
            <div className="info-modal-title ">
                <span id="close-modal" onClick={this.props.close}>&times;</span>
                {this.props.title}
            </div>
            <div className="info-modal-content">
                {sections}
            </div>
        </div>);
    }

    getSections() {

        const sections = this.props.sections.map((sectionProps, key) =>{
            if (!sectionProps.expandable) {
                return (
                    <InfoModalSection
                        key={key}
                        sectionHeading={sectionProps.sectionHeading}
                        iconSrc={sectionProps.iconSrc}
                        iconClass={sectionProps.iconClass}
                        deadline={sectionProps.deadline}
                        lineHeight={sectionProps.lineHeight}
                        last={sectionProps.last}
                    />
                )
            } else {
                return (
                    <ExpandableSection
                        key={key}
                        sectionHeading={sectionProps.sectionHeading}
                        iconSrc={sectionProps.iconSrc}
                        iconClass={sectionProps.iconClass}
                        expandedHeading={sectionProps.expandedHeading}
                        lineHeight={sectionProps.lineHeight}
                        deadline={sectionProps.deadline}
                        helpSection={sectionProps.helpSection}
                        helpURL={sectionProps.helpURL}
                        helpURLName={sectionProps.helpURLName}
                        content={sectionProps.content ? this.props.detailedContent : null}
                        last={sectionProps.last}
                    />

                )
            }
        });


       return ( sections );
    }

}
export default InfoModal;