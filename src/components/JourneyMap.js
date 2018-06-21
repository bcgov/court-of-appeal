import React from 'react';
import './journeymap.css';
import InfoPopup from './InfoPopup';

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
                <div className="form-section ">
                    <h2>Your Appeal Process</h2>
                    <p>{this.props.subTitle}</p>
                    <img  className="journey-map-image" src={this.props.mapSrc} useMap="#journeymap" alt="Your Appeal Journey Map" />
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

}

export default JourneyMap;