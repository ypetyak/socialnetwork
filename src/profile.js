import React from "react";

export default function Profile(props) {
    console.log("Props in profile:", props);
    return (
        <div className="profileBox">
            <div className="profilePicInProfile">
                <img
                    className="avatarImageinProfile"
                    onClick={props.clickHandler}
                    src={props.avatar_url}
                />
            </div>
            <div className="profileInfo">
                <h1 className="profileName">
                    {props.firstName} {props.lastName}
                </h1>

                {props.showBio ? (
                    <textarea className="updateBio"
                        onKeyDown={props.setBio}
                        defaultValue={props.bio}
                    />
                ) : (
                    <p className="profileBio"> {props.bio} </p>
                )}
                <p className="updateBioButton" onClick={props.toggleBio}>Update your Bio </p>
                <p className="updateBioButton" onClick={props.clickHandler}> Update your Avatar </p>
                <div className="switcherForFun">
                    <p> Privacy: </p>
                    <label className="switch">

                        <input type="checkbox"></input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}
