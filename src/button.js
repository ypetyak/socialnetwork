import React, { Component } from "react";
import axios from "./axios";
// import {Link} from 'react-router-dom';

import { getSocket } from "./socket";

export default class FriendButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "",
            buttonStatus: "",
            receiver_id: this.props.receiver_id
        };
        this.friendRequest = this.friendRequest.bind(this);
    }

    componentDidMount() {
        // console.log("Props in button: ", this.props.receiver_id);
        // var revieverId = this.props;

        axios
            .get("/makeFriends", {
                params: {
                    receiver_id: this.props.receiver_id
                }
            })
            .then(results => {
                console.log("Resultd for axios!!!", results);

                if (results.data == "") {
                    this.setState({
                        buttonText: "Make A Friend Request",
                        buttonStatus: 0
                    });
                } else if (results.data.status == 1) {
                    if (results.data.sender_id == this.props.receiver_id) {
                        this.setState({
                            buttonText: "Accept Friend Request",
                            buttonStatus: "1a"
                        });
                    } else {
                        this.setState({
                            buttonText: "Request is pending. Cancel?",
                            buttonStatus: "1b"
                        });
                    }
                } else if (results.data.status == 2) {
                    this.setState({
                        buttonText: "You are friends :) Unfriend? :'(",
                        buttonStatus: 2
                    });
                }
            });

        // axios.get("/friends").then(response => {
        //     let buttonText = "Make Friend Request";
        //
        //     if (data) {
        //         if (data.status == 2) {
        //             buttonText = "End Friendship";
        //         } else if (data.status == 1) {
        //             if (this.props.otherUserId != data.receiver_id) {
        //                 buttonText = "Accept Friendship";
        //             } else if (this.props.otherUserId == data.receiver_id) {
        //                 buttonText = "Cancel Friendship";
        //             }
        //         }
        //     }
        // });
    }

    friendRequest() {
        // console.log("You have no friends!", this.props.receiver_id);
        var receiver_id = this.props.receiver_id;

        if (this.state.buttonStatus == 0) {


            console.log("We are here");
            var status = 1;
            axios
                .post("/friendRequest", {
                    status: status,
                    receiver_id: receiver_id
                })
                .then(results => {
                    // console.log("After First Request", results);
                    this.setState({
                        buttonStatus: "1b",
                        buttonText: "Request is pending. Cancel?"
                    });

                    getSocket().emit("friendRequestNotification", this.props.receiver_id)
                });
        } else if (this.state.buttonStatus == "1a") {
            // become a friend
            var status2 = 2;
            axios
                .post("/friendRequest", {
                    status: status2,
                    receiver_id: receiver_id
                })
                .then(results => {
                    // console.log("After Pending", results);
                    this.setState({
                        buttonStatus: 2,
                        buttonText: "You are friends :) Unfriend? :'("
                    });
                });
        } else if (this.state.buttonStatus == "1b") {
            // cancel pending request
            axios
                .post("/deleteFriendRequest", {
                    receiver_id: receiver_id
                })
                .then(results => {
                    console.log("After Deleting", results);
                    this.setState({
                        buttonText: "Make A Friend Request",
                        buttonStatus: 0
                    });
                });
        } else if (this.state.buttonStatus == 2) {
            // cancel friend request
            axios
                .post("/deleteFriendRequest", {
                    receiver_id: receiver_id
                })
                .then(results => {
                    console.log("After Deleting", results);
                    this.setState({
                        buttonText: "Make A Friend Request",
                        buttonStatus: 0
                    });
                });
        }
    }

    render() {
        // console.log("render: ", this.state);
        return (
            <div className="friendButtonBox">
                <button className="friendButton" onClick={this.friendRequest}>
                    {this.state.buttonText}
                </button>
            </div>
        );
    }
}
