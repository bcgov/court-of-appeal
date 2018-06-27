import React, { Component } from 'react';
import '../infopopups/infopopup.css';

class BulletRow extends Component {

    render() {

        let rowcontent = null, description = null;
        if (this.props.row.descriptionLink) {
            description =  <a href={this.props.row.descriptionLink.URL} target="_blank">{this.props.row.descriptionLink.URLName}</a>;
        } else {
            description = this.props.row.description;
        }

        if (this.props.row.onlineForm) {
            // build a row that has a link to information about the file, and a link to a form after.
            rowcontent = (
                <div className="evenly-spaced">
                    <div>
                        {description}
                    </div>
                    <div >
                        <a className={"row-badge"} style={{padding:'5px'}} href={this.props.row.documentLink.URL} target="_blank">{this.props.row.documentLink.URLName}</a>
                    </div>
                </div>
            )
        } else {
            rowcontent = (
                <div className="bullet-row-content">
                    <div className="bullet-row-description">
                        {description}
                    </div>

                    <div className="bullet-row-badges-container">
                        <div className=" evenly-spaced">
                            <div>{this.props.row.times}</div><div className="row-badge" >{this.props.row.link1} </div><div className="row-badge" >{this.props.row.link2}</div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div key={"bullet-" + this.props.index} className="row bullet-list-row">
                <div className="col col-lg-1 col-md-1 bullet-div">
                    <div className="bullet"/>
                </div>
                {rowcontent}
            </div>
        );
    }
} export default BulletRow;