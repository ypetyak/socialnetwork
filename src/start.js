import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import Logo from "./logo";

import App from "./app";

/// ==== === === Additional import for REDUX

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

// ======= Importing Socket ==========

import { getSocket } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
); ////

////
let elem;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
} else {
    elem = (

        getSocket(store),

        <Provider store={store}>
            <App />
        </Provider>
    );
}

// if (location.pathname == "/nextpage") {
//     elem = <App />;
// }
ReactDOM.render(elem, document.querySelector("main"));

// class component
// class doesn't hoist, it should be befroe we render

// all class components have a STATE, where all data is stored
// class Hello extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             name: "Napoleon",
//             country: "Europe"
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     handleChange(e) {
//         console.log("Handle Change! Change!", e.target.value);
//         this.setState({
//             country: e.target.value
//         }),
//             () => console.log("This state: ", this.state);
//     }
//     // runs when the component have been loaded
//     componentDidMount() {
//         console.log("Mounting mountains mounted on the mount");
//     }
//
//     render() {
//         // thats what we need to pass an elemnt to another component
//         return (
//             <div>
//                 <h1> Welcome {this.state.name}! </h1>
//                 <Greetee name={this.state.country} />
//                 <GreeteeEditor handleChange={this.handleChange} />
//             </div>
//         );
//     }
// }
//
// function GreeteeEditor(props) {
//     return <input onChange={props.handleChange} />;
// }
//
// // we write props to tell Greetee that we are going to put some props in it.
// function Greetee(props) {
//     console.log("Props: ", props);
//     return (
//         <div>
//             <h3> Let's conquer {props.name} </h3>
//         </div>
//     );
// }
//
// // It is a react component - functional component. Exist to render the UI. They don't have functionality but to render stuff, people call them dumb component.
//
// function HelloWorld() {
//     let cohort = "Sesame";
//
//     let styleObject = {
//         //// In react we also can put all styling into the object and then insert it as an inline styling to the element:
//         color: "pink",
//         fontSize: "150px",
//         fontFamily: "Helvetica Neue",
//         fontWeight: 300
//     };
//
//     return (
//         // inline styling will have higher priority than class.
//         <div className="greeting">
//             <p>Hello, {cohort}!</p>
//             <p style={styleObject}> Julius Ceasar </p>
//         </div> // this div here is JS, not HTML. In React its called JSX - javascript which looks like html.
//     );
// }
