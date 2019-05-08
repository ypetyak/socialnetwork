import React, { Component } from 'react';
import { connect } from 'react-redux';
import {notifyUser} from './actions';

class Notification extends Component {
    constructor(){
        super();
        this.state = {};
        this.timeOut = this.timeOut.bind(this);
    }
    timeOut() {
        setTimeout(() => {
            this.props.dispatch(notifyUser(null));
        }, 150000);
    }
    render() {
        // const {notification} = this.props;
        this.timeOut();
        // console.log("STATE in NOTIFICATION: ", this.props.notification);
        return (
            <div className="upload2">
                <h1>
                    {this.props.notification.message}
                </h1>
            </div>
        );
    }
}

const mapsStateToProps = state => { // state = global redux state
//     console.log("State in Notifications (mapStateToProps): ", state.notification);
    return {
        notification: state.notification
    };
};

export default connect(mapsStateToProps)(Notification);
