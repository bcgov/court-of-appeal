import React, { Component } from 'react';
import './notification.center.css';

class NotificationCenter extends Component {

    render() {
        return (
            <div className="form-section">
                <h3>Notification Center</h3>
                <ol>
                    <li>Forms about to expire</li>
                    <li>Update Personal Address</li>
                    <li>Form 2 accepted</li>
                    <li>Deadline serve Form 2 in 10 days</li>
                </ol>
            </div>
        )
    }
}
export default NotificationCenter;