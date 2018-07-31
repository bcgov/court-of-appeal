import React from 'react';
import './journeymap.css';
import InfoPopup from './infopopups/common/InfoPopup';

class JourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showInfoModal: false,
            popupType: ''
        };
        this.getAreas = this.getAreas.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
    }

    render() {

        if(this.props.mapProps) {
            let targetAreas = this.getAreas();
            return (
                <div className="form-section "  onClick={this.handleClickOffModal.bind(this)}>
                    <h2>The Appeal Process</h2>
                    <div>
                        Follow the steps below to respond to the appeal.
                        <br/>
                        Every appeal process is different.
                        If you have any questions, please visit the <a href="https://www.courtofappealbc.ca/respondent-guidebook/step-1-how-to-respond-to-an-appeal">Help Guide Website</a> or <a href="mailto:courts.cso@gov.bc.ca">contact the registry</a>.
                    </div>
                    <img id="journey-map-image" className="journey-map-image" src={process.env.PUBLIC_URL + this.props.mapSrc} useMap="#journeymap" alt="Your Appeal Journey Map" />
                    <map name="journeymap" >
                        {targetAreas}
                    </map>
                    <InfoPopup
                        show={this.state.showInfoModal}
                        close={this.closeInfoModal}
                        type={this.state.popupType}
                    />
                </div>
            );
        } else {
            return null;
        }

    }

    getAreas() {
        return this.props.mapProps.map((prop, key) => {
            if (prop.function) {
                return <area alt={prop.alt}  onClick={this.openInfoModal.bind(this, prop.function)} key={key} shape="rect" {...prop} />;
            } else {
                return <area alt={prop.alt} key={key} shape="rect" {...prop}/>
            }
        });
    }

    closeInfoModal() {
        this.setState({showInfoModal:false});
    }

    openInfoModal(popupType) {
        this.setState({showInfoModal:true, popupType: popupType});
    }

    handleClickOffModal(e) {
        if (!e.target.id) {
            return;
        }
        if (this.state.showInfoModal && e.target.id.includes('info-modal')) {
            this.closeInfoModal();
        }
    }

}

export default JourneyMap;