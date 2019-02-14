import React from 'react';
import './fileicon.css';

class FileIcon extends React.Component {

    render() {
        return (
            <div className={this.props.className}>
                <div className={"file-container"}>
                    <div id={"box-1"} className={"journey-respondent-start-box"} />
                    <div id={"corner-1"} className={"journey-respondent-start-box-corner-big"} />
                    <div id={"corner-2"} className={"journey-respondent-start-box-corner-little"} />
                    <div id={"corner-3"} className={"journey-respondent-start-box-corner-cover"} />
                </div>
            </div>
            );

    }

} export default FileIcon;