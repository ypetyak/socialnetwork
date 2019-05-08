
import React from "react";


import { connect } from "react-redux";
import { onlineUsers, disconnectUser } from "./actions.js";
import { Link } from "react-router-dom";

class OnlineUsers extends React.Component {

    componentDidMount() {
        this.props.dispatch(onlineUsers());

    }

    render() {
        // console.log("We are in our component for onlineUsers: ", this.props);
        if (!this.props.users) {
            return (
                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }
        return (
            <div className="boxOfFriends">
                <h2 className="friendsBoxTitle"> Online Users </h2>
                <div className="realFriends">

                    {this.props.users.map(user => (
                        <div key={user.id} className="friendBox">
                            <a href={`/user/${user.id}`}><img className="imageOfAFriendinFriends" src={user.avatar_url} /></a>
                            <div className="nameOfTheFriend">
                                <p>
                                    {user.first} {user.last}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    // console.log("state in onlineUsers:", state);
    return {
        users: state.onlineUsers
    };
};

// return {
//     friends: state.friends.filter(user => user.status == 2),
//     wannabes: state.friends.filter(user => user.status == 1)
// };

export default connect(mapStateToProps)(OnlineUsers);
