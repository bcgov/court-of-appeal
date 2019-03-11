import React, {Component} from 'react';
import Journey from './components/Journey.js';
import Top5 from './forms/Top5.js';
import ActiveFormList from './components/ActiveFormList.js';
import NeedHelp from './NeedHelp.js';
import './dashboard.css';
import ReactTooltip from 'react-tooltip';
import renderCases from "./components/cases.renderer";
import findCaseById from "./helpers/find.case.by.id";
import DefaultService from "./service/default.service";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.service = props.service;
        this.state = {
            fetch: props.fetch !== 'false',
            cases: [],
            displayMyCasesEmptyLabel:true
        };
        this.fetchCases = this.fetchCases.bind(this);
        this.updateCases = this.updateCases.bind(this);
    }

    componentDidMount() {

        if (this.service == null) {
            let window = this.element.ownerDocument.defaultView;
            this.service = new DefaultService(window);
        }
        if (this.state.fetch) { console.log("Fetching cases")
            this.fetchCases(); 
        }
    }

    fetchCases() {
        this.service.getMyCases({}, (data) => {
            let cases = renderCases(data.cases.slice(0, 5));
            this.setState({
                cases:cases,
                displayMyCasesEmptyLabel: (cases.length === 0)
            });
        });
    }

    updateCases(data, id) {
        findCaseById({id:id, cases:this.state.cases}, (found)=>{
            found.data = data;
            this.setState({ cases:this.state.cases });
        });
    }

    render() {
        console.log("cases", this.state.cases)
        return (
            <div id="topicTemplate" className="template container gov-container form" ref={ (element)=> {this.element = element }}>
                <div className="row">
                    <div role="main" className="col col-sm-12">
                        <ActiveFormList 
                            fetch={this.state.fetch}
                            updateCases={this.updateCases}
                            fetchCases={this.fetchCases}
                            service={this.service}
                            cases={this.state.cases}
                            displayMyCasesEmptyLabel={this.state.displayMyCasesEmptyLabel}
                        />
                    </div>
                </div>
                <div className="row">
                    <div role="main" className="center-main col col-lg-8" >
                        <Journey
                            cases={this.state.cases}
                        />
                    </div>
                    <div role="main" className="right-nav-main col col-lg-4"  >
                        <div className="row">
                            <div className="col col-lg-12">
                                <Top5/>
                            </div>
                        </div>
                        <div className="row">
                            <div role="main" className="col col-lg-12">
                                <NeedHelp/>
                            </div>
                        </div>
                    </div>
                </div>
                <ReactTooltip
                    multiline={true}
                    html={true}
                    effect="solid"
                    delayHide={1000}
                    className="right-to-appeal-tooltip"
                    wrapper="div"
                />
            </div>
        );
    }
}

export default Dashboard;
