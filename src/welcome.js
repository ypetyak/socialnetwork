import React from "react";
import Registration from "./registration";
import Logo from "./logo";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default function Welcome() {
    return (
        <div className="mainBox">
            <h1 className="welcomeText">Welcome to your own...</h1>
            <Logo />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
            <div id="bubbles">
                <div className="bubble x1" />
                <div className="bubble x2" />
                <div className="bubble x3" />
                <div className="bubble x4" />
                <div className="bubble x5" />
                <div className="bubble x6" />
                <div className="bubble x7" />
                <div className="bubble x8" />
                <div className="bubble x9" />
                <div className="bubble x10" />
                <div className="bubble x11" />
                <div className="bubble x12" />
                <div className="bubble x13" />
            </div>
        </div>
    );
}
