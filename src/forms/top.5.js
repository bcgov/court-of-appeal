import React, { Component } from 'react';
import './top.5.css';

class Top5 extends Component {

    render() {
        return (
            <div className="dashboard-section">
                <h3>Top 5 Most Used Forms</h3>
                <ol>
                    <li><a id="form7" href="/forms/form.7.html" target="_self">Notice of Appeal (Form 7)</a></li>
                    <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form 2)</a>&nbsp;</li>
                    <li>Notice of Application for Leave to Appeal (Form 1)</li>
                    <li></li>
                    <li></li>
                </ol>
            </div>
        )
    }
}
export default Top5;