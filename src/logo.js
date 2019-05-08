import React from "react";

export default function Logo() {
    let logoStyle = {
        color: "SkyBlue",
        fontSize: "120px",
        fontFamily: "Helvetica Neue",
        border: "2px solid SkyBlue",
        "box-shadow": "0 0 8px white",
        padding: "10px",
        margin: "10px",
        background: "white",
        fontWeight: "lighter",
        "z-index": 2,
        position: "relative"
    };

    if (location.pathname == "/welcome") {
        return <h1 style={logoStyle}>Bubble</h1>;
    } else {
        return <h1 className="logo">Bubble</h1>;
    }
}
