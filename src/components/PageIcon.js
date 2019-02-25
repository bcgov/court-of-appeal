import React from 'react';
import './fileicon.css';

class PageIcon extends React.Component {

    render() {
        
        let secondPage = null;
        if (this.props.twoPages) {
            secondPage = (
                <div>
                    <div className={"file-main bottom-pg second-page"} />
                    <div className={"file-corner-l bottom-pg-corner-l second-page"} />
                    <div className={"file-corner-s bottom-pg-corner-s second-page"} />
                    <div className={"file-corner-cover bottom-pg-corner-cover second-page"} />
                </div>
            )
        }
        return (
            <div className={this.props.className}>
                <div className={"file-container"}>
                    <div className={"file-main top-pg"} />
                    <div className={"file-corner-l top-pg-corner-l"} />
                    <div className={"file-corner-s top-pg-corner-s"} />
                    <div className={"file-corner-cover top-pg-corner-cover"} />
                    {secondPage}
                </div>
            </div>
        )
    }

} export default PageIcon;