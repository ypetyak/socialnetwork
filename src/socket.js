import * as io from "socket.io-client";

import { onlineUsers, disconnectUser, newUserOnline, newChatMessage, chatMessages, privateChatMessages, notifyUser } from './actions';

let socket;

export function getSocket(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("onlineUsers", data => {
        store.dispatch(onlineUsers(data));
    });

    socket.on('newUserOnline', data => {
        store.dispatch(newUserOnline(data));
    });


    socket.on('disonnect', data => {
        store.dispatch(disconnectUser(data));
    });

    // Now we want add functionality for the chat. At first we load all messages we store and then create ability to get new messages.

    socket.on('chatMessages', messages => {
        store.dispatch(chatMessages(messages));
    });

    socket.on('newChatMessage', message => {
        store.dispatch(newChatMessage(message));
    });

    socket.on('privateChatMessages', message => {
        store.dispatch(privateChatMessages(message));
    });


    // socket.on('friendRequest', message => {
    //     console.log("Friend Request is Here!", message);
    //     store.dispatch(privateChatMessages(message))
    // })

    socket.on('notification', data => {
        store.dispatch(notifyUser(data));
    });

    // we do return socket so we can export wherever we want it and run it from there.
    return socket;
}