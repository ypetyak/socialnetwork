import * as io from "socket.io-client";

import { onlineUsers, disconnectUser, newUserOnline, newChatMessage, chatMessages, privateChatMessages, notifyUser } from './actions'

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("onlineUsers", data => {
        // console.log("All Online Users in socket.js: ", data);
        store.dispatch(onlineUsers(data))

    })
    //
    socket.on('newUserOnline', data => {
        // console.log("New user online in socket.js", data);

        store.dispatch(newUserOnline(data))
    })


    socket.on('disonnect', data => {
        // console.log("We have Disconnected in Socket.js", data);


        store.dispatch(disconnectUser(data))
    })

/// Now we want add functionality for the chat. At first we load all messages we store and then create ability to get new messages.

    socket.on('chatMessages', messages => {
        store.dispatch(chatMessages(messages))
    })

    socket.on('newChatMessage', message => {
        // console.log("We got into dispatching our message");
        store.dispatch(newChatMessage(message))
    })

    socket.on('privateChatMessages', message => {
    //     console.log("We are in Private Chat");
        store.dispatch(privateChatMessages(message))
    })


    // socket.on('friendRequest', message => {
    //     console.log("Friend Request is Here!", message);
    //     store.dispatch(privateChatMessages(message))
    // })

    socket.on('notification', data => {
        //     console.log("NOTIFICATION RECEIVED!");
            store.dispatch(notifyUser(data));
        });

    // we do return socket so we can export wherever we want it and run it from there.
    return socket;
}





/// getSocket().emit('chat', { // on enter or something
//  text: "I hate you"
// })

// io.on('connection', function(socket) {
//
//     db.getRecentMessages(results => {
//         socket.emit('chatMessages', results)
//     })
//
//
//
//
//     socket.on('chatMessage', function(message) {
//
//         in.socket.emit('chatMessage', {
//             message: message,
//             id: userId,
//             timeStamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleDateString();
//         })
//
//     })
//
// })


// we need to show 10 recent messeges
// we can keep an array of messages in the array and display it.

// Probably better to create a Tables with all messages and then create a table. with user id, etc.

// You can join them with other table

// overflow auto

// make

// elem.scrollTop = elem.scrollHeight - elem.clientHeight
//
//
// //
//
// componentDidUpdate() {
//     this.elem.scrollTop =>
// }
//
//
// render() {
// return (
//     <div>
//         <div id="chat-messages" ref={elem => (this.elem) = elem}>
//             {this.props.chatMessage.map(
//                 msg => (
//                     <div>msg</div>
//                 )
//             )}
// )
// }
