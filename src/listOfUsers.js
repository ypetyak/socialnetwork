import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom"; // we need it for nextProps;

export default class ListOfUsers extends Component {
    constructor(props) {
        super(props);
        // we can put all value in state if we want and make them empty/true etc.
        this.state = {};
    }

    componentDidMount() {
        // if ()
        // console.log("Hello Velvetica");
        // axios.get(`/getListOfUsers`).then(results => {
        //     console.log("list of useres: ", results.data);
        //
        //     for (var i = 0; i <= results.data.length; i++) {
        //         console.log(results.data[i].first);
        //     }
        //
        //     // console.log("Here is there:", userList);
        //     this.setState(results.data);
        // });
        // var Hello =
        //     render: function() {
        //         var names = ["Jake", "Jon", "Thruster"];
        //         var namesList = names.map(function(name) {
        //             return <li>{name}</li>;
        //         });
        //
        //         return <ul>{namesList}</ul>;
        //     }
        //
        //
        // });
    }

    // componentWillRecieveProps(nextProps) {
    //     console.log("Next Props: ", nextProps);
    // }
    render() {
        return (
            <div>
                <p> Hello World</p>
            </div>
        );
    }
}
