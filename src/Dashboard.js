import React, {Component} from 'react';
import Journey from './components/Journey.js';
import Top5 from './forms/top.5.js';
import ActiveFormList from './components/ActiveFormList.js';
import NeedHelp from './need.help.js';
import './dashboard.css';

class Dashboard extends Component {

    render() {
        return (
            <div id="topicTemplate" className="template container gov-container form">
                <div className="row">
                    <div role="main" className="col-sm-12">
                        <ActiveFormList />
                    </div>
                </div>
                <div className="row">
                    <div role="main" className="center-main col-lg-8" >
                        <Journey/>
                    </div>
                    <div role="main" className="right-nav-main col-lg-4"  >
                        <div className="row">
                            <div className="col-lg-12">
                                <Top5/>
                            </div>
                        </div>
                        <div className="row">
                            <div role="main" className="col-lg-12">
                                <NeedHelp/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
