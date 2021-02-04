import React, { Component } from 'react';
import '../infopopups/common/infopopup.css';

class BulletRow extends Component {

    render() {

        let rowcontent = null, description = null;
        if (this.props.row.descriptionLink) {
            description =  <a href={this.props.row.descriptionLink.URL} target="_blank" rel="noopener noreferrer">{this.props.row.descriptionLink.URLName}</a>;
        } else {
            description = this.props.row.description;
        }


        description = <div id={'bullet-' + this.props.id}> {description} { this.props.row.descriptionLink!==undefined && this.props.row.descriptionLink.tooltip!==undefined ? <i className="oi oi-question-mark" aria-hidden="true" data-tip={this.props.row.descriptionLink.tooltip}></i> : ``} </div>;

        if (this.props.row.onlineForm) {
            let action = this.props.row.documentLink.URL ? {href: this.props.row.documentLink.URL}:  {onClick: this.props.row.documentLink.action};
            rowcontent = (
                <div className="evenly-spaced">
                    <div>
                        {description}
                    </div>
                    <div >
                        <a className={"row-badge"} {...action} style={{padding:'5px', cursor: 'pointer'}}  target="_blank" rel="noopener noreferrer">{this.props.row.documentLink.URLName}</a>
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
                            <div className="bullet-row-times-mention">{this.props.row.times}</div>
                            <div className="row-badge" >
                                <a href={this.props.row.docLink.URL}>{this.props.row.docLink.URLName}</a>
                            </div>
                            <div className="row-badge" >
                                <a href={this.props.row.pdfLink.URL} target="_blank" rel="noopener noreferrer">{this.props.row.pdfLink.URLName}</a>
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
