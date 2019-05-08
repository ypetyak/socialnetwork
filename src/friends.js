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

                            <a href={`/user/${friend.id}`}><img className="imageOfAFriendinFriends" src={friend.avatar_url} /></a>
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

                            <a href={`/user/${friend.id}`}><img className="imageOfAFriendinFriends" src={friend.avatar_url} /></a>
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

// return {
//     friends: state.friends.filter(user => user.status == 2),
//     wannabes: state.friends.filter(user => user.status == 1)
// };

export default connect(mapStateToProps)(Friends);

// class Not extends React.Component {
//     render() {
//         const { users, makeHot } = this.props;
//         if (!users) {
//             return null;
//         }
//         const notUsers = (
//             <div className="users">
//                 {users.map(user => (
//                     <div className="user">
//                         <img src={user.image} />
//                         <div className="buttons">
//                             <button>Hot</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//         return (
//             <div id="not">
//                 {!users.length && <div>Nobody is not hot!</div>}
//                 {!!users.length && notUsers}
//                 <nav>
//                     <Link to="/">Home</Link>
//                     <Link to="/hot">See who&apos;s hot</Link>
//                 </nav>
//             </div>
//         );
//     }
// }
