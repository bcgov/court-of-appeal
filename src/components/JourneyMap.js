import React from 'react';
import './journeymap.css';

class JourneyMap extends React.Component {

    render() {
        return (
                <div className="form-section">
                    <h2>Your Appeal Process</h2>
                    <p>{this.props.subTitle}</p>
                    <img  className="journey-map-image" src={this.props.mapSrc} useMap="#journeymap" alt="Appeal Journey Map" />
                    <map name="journeymap">
                        <area shape="rect" coords="75,20,180,200" href="/form.2.html" alt="e-file a notice of appearance"/>
                    </map>
                </div>
            );
    }
}

export default JourneyMap;