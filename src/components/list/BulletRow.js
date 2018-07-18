import React, { Component } from 'react';
import '../infopopups/common/infopopup.css';

class BulletRow extends Component {

    render() {

        let rowcontent = null, description = null;
        if (this.props.row.descriptionLink) {
            description =  <a href={this.props.row.descriptionLink.URL} target="_blank">{this.props.row.descriptionLink.URLName}</a>;
        } else {
            description = this.props.row.description;
        }
        
        
        description = <div id={'bullet-' + this.props.id}> {description} { this.props.row.descriptionLink!==undefined && this.props.row.descriptionLink.tooltip!==undefined ? <i className="fa fa-question-circle" aria-hidden="true" data-tip={this.props.row.descriptionLink.tooltip}></i> : ``} </div>;

        if (this.props.row.onlineForm) {
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
                            <div>{this.props.row.times}</div>
                            <div className="row-badge" >
                                <a href={this.props.row.docLink.URL}>{this.props.row.docLink.URLName}</a>
                            </div>
                            <div className="row-badge" >
                                <a href={this.props.row.pdfLink.URL} target="_blank">{this.props.row.pdfLink.URLName}</a>
                            </div>
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