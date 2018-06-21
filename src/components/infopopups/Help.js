import React, { Component } from 'react';

class Help extends Component {

    render() {

        console.log(this.props);
        return (
            <div className={"row"}>
                <div className="col col-lg-12 col-md-12 col-sm-12">
                    <div className="row ">
                        <div style={{fontWeight: "bolder", marginBottom: '20px', paddingTop: '20px'}}
                             className="col col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 ">
                            Need help completing a document?
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 help-contacts">
                            <div>
                                <a href={this.props.URL}>{this.props.URLName}</a>
                            </div>
                            <div>|</div>
                            <div>
                                <a href="mailto:courts.cso@gov.bc.ca">Email: Courts.cso@gov.bc.ca</a>
                            </div>
                            <div>|</div>
                            <div>
                                Call: 1-800-663-6102
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

} export default Help;