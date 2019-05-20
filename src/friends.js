import React from "react";

import { receiveFriends, unfriend, acceptRequest } from "./actions.js";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getSocket } from "./socket";

class Friends extends React.Component {
    componentDidMount() {
        this.props.dispatch(receiveFriends());
    }

    render() {
        // console.log("Our Props: ", this.props);
        if (!this.props.friends) {
            return (
                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }
        return (
            <div className="boxOfFriends">
                <h2 className="friendsBoxTitle"> Friends </h2>
                <div className="realFriends">

                    {this.props.friends.map(friend => (
                        <div key={friend.id} className="friendBox">
                            <a onClick={e => {
                                getSocket().emit("privateChat", friend.id)

                            }} className="chatWithFriend" href="/privateChat">Private Chat</a>

                            <Link to={`/user/${friend.id}`}><img className="imageOfAFriendinFriends" src={friend.avatar_url} /></Link>
                            <div className="nameOfTheFriend">
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                                <button
                                    className="friendsButton"
                                    onClick={e => {
                                        this.props.dispatch(
                                            unfriend(friend.id)
                                        );
                                    }}
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h2 className="friendsBoxTitle"> Friend Requests</h2>
                <div className="almostFriends">

                    {this.props.wannabes.map(friend => (
                        <div key={friend.id} className="friendBox">

                            <Link to={`/user/${friend.id}`}><img className="imageOfAFriendinFriends" src={friend.avatar_url} /></Link>
                            <div className="nameOfTheFriend">
                                <p>
                                    {friend.first} {friend.last}
                                </p>
                                <button
                                    className="friendsButton"
                                    onClick={e => {
                                        this.props.dispatch(
                                            acceptRequest(friend.id)
                                        );
                                    }}
                                >
                                    Accept Friend Request
                                </button>
                                <button
                                    className="friendsButton"
                                    onClick={e => {
                                        this.props.dispatch(
                                            unfriend(friend.id)
                                        );
                                    }}
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    console.log("state", state);
    return {
        friends:
            state.friends && state.friends.filter(user => user.status == 2),
        wannabes:
            state.friends && state.friends.filter(user => user.status == 1)
    };
};

export default connect(mapStateToProps)(Friends);