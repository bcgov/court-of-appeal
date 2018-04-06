import React, { Component } from 'react';
import './top.5.css';

class Top5 extends Component {

    render() {
        return (
            <div className="form-section">
                <h3>Most Used Forms</h3>
                <ol>
                    <li><a id="form7" href="/forms/form.7.html" target="_self">Notice of Appeal (Form 7)</a></li>
                    <li><a id="form2" href="/forms/form.2.html" target="_self">Notice of Appearance (Form 2)</a>&nbsp;</li>
                    <li>Certificate of Readiness</li>
                    <li>Affidavit</li>
                    <li>Notice of Hearing Appeal</li>
                </ol>
            </div>
        )
    }
}
export default Top5;