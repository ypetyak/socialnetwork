import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OnlineUsers extends React.Component {

    render() {

        if (!this.props.users) {
            return (
                <div> Loading... </div>
            );
        }

        return (
            <div className="boxOfFriends">
                <h2 className="friendsBoxTitle"> Online Users </h2>
                <div className="realFriends">
                    {this.props.users.map(user => (
                        <div key={user.id} className="friendBox">
                            <Link to={`/user/${user.id}`}><img className="imageOfAFriendinFriends" src={user.avatar_url} /></Link>
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
    return {
        users: state.onlineUsers
    };
};

export default connect(mapStateToProps)(OnlineUsers);
