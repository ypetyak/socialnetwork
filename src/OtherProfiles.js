import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"; // we need it for nextProps;
import FriendButton from "./button.js";

export default class OtherProfiles extends Component {
    constructor(props) {
        super(props);
        // we can put all value in state if we want and make them empty/true etc.
        this.state = {};
    }

    componentDidMount() {

        // console.log(
        //     "Component Did Moount Props",
        //     this.props.match.params.userId
        // );

        axios
            .get(`/get-user/${this.props.match.params.userId}`)
            .then(results => {
                // if (results.data.id == this.props.match.params.userId) {
                //     this.props.history.push("/");
                var userData = results.data;
                //console.log("User Data: ", userData);
                // }
                axios.get('/friendsOfAFriend', {
                    params: {
                        friendId: this.props.match.params.userId
                    }
                }).then(results => {
                    //console.log("Friends of a Friend Axios: ", results);

                    userData = {...userData, ...results}
                    //console.log("User Data United: ", userData);
                    this.setState(userData);
                    // console.log("State with New Data: ", this.state);
                })


                // console.log(
                //     "Response from Axios request in OtherProfiles: ",
                //     this.state.id
                // );
            });
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("Next Props: ", nextProps);
    //     // if (nextProps.match.params.id != this.props.match.params.id) {
    //     //     //FETCH USER X INFO
    //     // }

    render() {
        //console.log("State with New Data: ", this.state.data);

        if (!this.state.data) {
            return (
                <div> Loading... </div> // you can replace it with some funny or useful image/text
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

// {this.state.data.map(user => (
//      <div className="whoIsInChatImage" key={user.id}>
//        <a href={`/user/${user.id}`}><img className="imageOfAFriendInChat" src={user.avatar_url} /></a>
// </div>
// ))}
