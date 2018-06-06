import React from 'react';
import './journeymap.css';

class JourneyMap extends React.Component {

    constructor(props) {
        super(props);
        this.getAreas = this.getAreas.bind(this);
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
                </div>
            );
        } else {
            return null;
        }

    }

    getAreas() {
        return this.props.mapProps.map((prop, key) => {
            return <area alt={prop.alt} key={key} shape="rect" {...prop}/>
        });
    }


}

export default JourneyMap;