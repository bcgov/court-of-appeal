import React from 'react';
import './journeymap.css';

class JourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.getAreas = this.getAreas.bind(this);
    }

    render() {
        let map = null;
        let targetAreas = this.getAreas();

        return (
                <div className="form-section ">
                    <h2>Your Appeal Process</h2>
                    <p>{this.props.subTitle}</p>
                    <img  className="journey-map-image" src={this.props.mapSrc} useMap="#journeymap" alt="Appeal Journey Map" />
                    <map name="journeymap">
                        {targetAreas}
                    </map>
                </div>
            );
    }

    getAreas() {
        return this.props.mapProps.map((prop, key) => {
            return <area key={key} shape="rect" {...prop}/>
        });
    }


}

export default JourneyMap;