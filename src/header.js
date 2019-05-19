import React from 'react';
import { Link } from "react-router-dom";

import Logo from "./logo";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import Bubbles from "./bubbles";

export default function Header() {
    return (
        <div className="fakeFooter">
            <Bubbles />
            <Logo />
            <div className="linkBoxInHeader">
                <Link className="linkInHeader" to="/profile">Profile</Link>
                <Link className="linkInHeader" to="/">Home</Link>
                <Link className="linkInHeader textTooBigInHeader" to="/onlineUsers">Online Users</Link>
                <Link className="linkInHeader" to="/chat">Chat</Link>
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
    )
}
