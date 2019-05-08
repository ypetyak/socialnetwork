import React from "react";
import axios from "./axios";

export default function ProfilePic(props) {
    return (
        <div className="profilePic">
            <img
                className="avatarImage"
                onClick={props.clickHandler}
                src={props.avatar_url}
            />
        </div>
    );
}
