import React, { Component } from "react";
import axios from "./axios";
import { Link } from 'react-router-dom';
import FriendButton from "./button.js";


export default class OtherProfiles extends Component {
    constructor(props) {
        super(props);
        // we can put all value in state if we want and make them empty/true etc.
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/get-user/${this.props.match.params.userId}`)
            .then(results => {
                var userData = results.data;
                axios.get('/friendsOfAFriend', {
                    params: {
                        friendId: this.props.match.params.userId
                    }
                }).then(results => {
                    userData = { ...userData, ...results };
                    this.setState(userData);
                });
            });
    }


    render() {
        if (!this.state.data) {
            return (
                <div> Loading... </div>
            );
        }

        return (
            <div className="profileUsersBox">
                <div className="otherUserInfo">
                    <img
                        className="avatarImageinOthersProfile"
                        src={this.state.avatar_url}
                    />
                    <div className="profileOtherInfo">
                        <h1>
                            {this.state.first} {this.state.last}
                        </h1>
                        <p className="profileBio"> {this.state.bio} </p>
                    </div>
                    <FriendButton receiver_id={this.props.match.params.userId} />
                </div>
                <div className="theWall">
                    <h2> The Wall is under construction. </h2>
                </div>
                <div className="firendsOfaFriend">
                    <h2 className="chattingNowText"> Friends with: </h2>
                    {this.state.data.map(user => (
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
