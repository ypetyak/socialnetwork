import React from "react";
import axios from "./axios";
import Logo from "./logo";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Bubbles from "./bubbles";
import OtherProfiles from "./OtherProfiles";
import ListOfUsers from "./listOfUsers";
import Friends from "./friends";
import Chat from "./chat";
import PrivateChat from "./privateChat";

import OnlineUsers from "./onlineUsers";
import Notification from './notification';


import { BrowserRouter, Route } from "react-router-dom";
import Profile from "./profile";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        // we can put all value in state if we want and make them empty/true etc.
        this.state = {
            id: null,
            first: "",
            last: "",
            email: "",
            bio: "",
            avatar_url: "",
            showBio: false,
            uploaderIsVisible: false
        };

        this.updateImage = this.updateImage.bind(this);
        this.makeUploaderVisible = this.makeUploaderVisible.bind(this);

        this.toggleBio = this.toggleBio.bind(this);
        this.setBio = this.setBio.bind(this);

        this.logout = this.logout.bind(this);
    }
    // Mounting happens after constructor constructed the page.
    //This is a default function, where we usally fetch data
    componentDidMount() {
        axios
            .get("/user")
            .then(({ data }) => {
                if (!data.avatar_url) {
                    data.avatar_url = "./avatar.png";

                    this.setState(data);
                    console.log("Data from the table: ", this.state);
                } else {
                    this.setState(data);
                    console.log("Happy", this.state);
                }
            })
            .catch(error => {
                console.log("Error in App.js GET request: ", error);
            });
    }

    makeUploaderVisible() {
        console.log("Hello");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }
    updateImage(imageUrl) {
        console.log("Our new great image: ", imageUrl);
        this.setState({
            avatar_url: imageUrl,
            uploaderIsVisible: false
        });
    }

    toggleBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }

    logout() {
        axios.post("/logout");
    }

    setBio(e) {
        if (e.which === 13) {
            this.setState({
                bio: e.target.value,
                showBio: false
            });

            axios
                .post("/profile", {
                    bio: e.target.value
                })
                .catch(error => {
                    console.log("Error in AXIOS POST bio ", error);
                });
        }
    }

    render() {
        // there will be a small period of time when data will not be yet apploaded
        // so we have to prevent page from rendering untill we have all data.
        // but when our request will complete itself in componentDidMount it will send
        // another render.
        if (!this.state.id) {
            return (
                <div> Loading... </div> // you can replace it with some funny or useful image/text
            );
        }
        return (
            <div className="main">
                <div className="fakeFooter">
                    <Bubbles />
                    <Logo />
                    <div className="linkBoxInHeader">
                        <a href="/profile" className="linkInHeader"> Profile </a>
                        <a href="/" className="linkInHeader"> Home </a>
                        <a href="/friends" className="linkInHeader"> Friends </a>
                        <a href="/onlineUsers" className="linkInHeader textTooBigInHeader"> Online Users </a>
                        <a href="/chat" className="linkInHeader"> Chat </a>
                    </div>
                    <ProfilePic
                        avatar_url={this.state.avatar_url}
                        first={this.state.first}
                        last={this.state.last}
                        clickHandler={this.makeUploaderVisible}
                    />
                    <a href="/" onClick={this.logout} className="linkInHeader logoutButton"> Logout </a>

                    {this.state.uploaderIsVisible && (
                        <Uploader
                            updateImage={this.updateImage}
                            closePopup={this.makeUploaderVisible}
                        />
                    )}
                </div>
                <BrowserRouter>
                    <div className="componentBox">

                            <Route
                                exact
                                path="/profile"
                                render={() => (

                                    <div className="profileBox">
                                        <Profile
                                            id={this.state.id}
                                            firstName={this.state.first}
                                            lastName={this.state.last}
                                            bio={this.state.bio}
                                            avatar_url={this.state.avatar_url}
                                            showBio={this.state.showBio}
                                            toggleBio={this.toggleBio}
                                            setBio={this.setBio}
                                            clickHandler={
                                                this.makeUploaderVisible
                                            }
                                        />
                                    </div>

                                )}
                            />
                            <Route
                                exact
                                path="/user/:userId"
                                component={OtherProfiles}
                            />


                        <Route
                            exact
                            path="/listOfUsers"
                            component={ListOfUsers}
                        />
                        <Route exact path="/friends" component={Friends} />
                        <Route exact path="/onlineUsers" component={OnlineUsers} />
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/privateChat" component={PrivateChat} />
                            <Route
                                exact path="/notification"
                                component={Notification}
                            />
                        </div>
                </BrowserRouter>
                <div className="veryFakeFooter">
                    Yevhen Petyak &#9400; 2019
                </div>
            </div>
        );
        // if uploader is visible it should be apploaded. Uploader will be a popup window, user suppose to be able to close popup (set it false).
    }
}

/// create a rout to extract information from users DB. Name, user id etc. Not password and emails though.

/// profile Pic should return img tag with url etc.

// <ProfilePic
//     imageUrl={this.state.imageUrl}
//     first={this.state.first}
//     last={this.state.last}
//     clickHandler={this.makeUploaderVisible}
// />;
