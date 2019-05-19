import React from 'react';
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <div className="linkBoxInHeader">
            <Link className="linkInHeader" to="/profile">Profile</Link>
            <Link className="linkInHeader" to="/">Home</Link>
            <Link className="linkInHeader textTooBigInHeader" to="/onlineUsers">Online Users</Link>
            <Link className="linkInHeader" to="/chat">Chat</Link>
        </div>
    )
}
