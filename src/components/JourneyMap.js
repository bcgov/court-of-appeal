import React from 'react';
import './journeymap.css';

class JourneyMap extends React.Component {

    constructor(props) {
        super (props);
    }

    render() {
        console.log(this.props);
        return (
                <div className="form-section">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.subTitle}</p>
                    <img  className="journey-map-image" src={this.props.mapSrc} useMap="#journeymap" />
                    <map name="journeymap">
                        <area shape="rect" coords="75,20,180,200" href="/form.2.html"/>
                    </map>
                </div>
            );
    }
}

export default JourneyMap;