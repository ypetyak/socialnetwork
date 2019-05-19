import React from "react";
import axios from "./axios";
import { Link, HashRouter, Route } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        // console.log("These: ", this.first, this.email);
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div className="register">
                {this.state.error && (
                    <div className="error">Error! Try Again.</div>
                )}
                <input
                    onChange={this.handleChange}
                    name="email"
                    className="input"
                    placeholder="Email"
                />
                <input
                    onChange={this.handleChange}
                    type="password"
                    name="password"
                    className="input"
                    placeholder="Password"
                />
                <button onClick={this.submit} className="button">
                    Login
                </button>

                <h2 className="alreadyRegistredText">
                    Don't have an account? Register
                    <Link to="/"> Here</Link>
                </h2>
            </div>
        );
    }
}
