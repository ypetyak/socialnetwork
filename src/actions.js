import axios from "./axios";

export async function receiveFriends() {
    const { data } = await axios.get("/listOfFriends");
    // console.log("Data in ACTIONS in Receive Friends", data);
    return {
        type: "LIST_OF_FRIENDS",
        friends: data
    };
}

export async function unfriend(props) {
    var receiver_id = props;
    const { data } = await axios.post("/deleteFriendRequest", {
        receiver_id: receiver_id
    });
    return {
        type: "UNFRIEND",
        receiver_id
    };
}

export async function acceptRequest(props) {
    // console.log("Props:", props);
    var receiver_id = props;

    const { data } = await axios.post("/friendRequest", {
        receiver_id: receiver_id,
        status: 2
    });

    return {
        type: "ACCEPT_REQUEST",
        receiver_id
    };
}



// ==== ===== ====== NOW WE USE SOCKET HERE ===== ======


export async function onlineUsers(users) {
    console.log("Online users here: In actions", users);
    return {
        type: "ONLINE_USERS",
        users: users

    };

}

export async function disconnectUser(userId) {

    return {
        type: "DISCONNECT",
        userId
    };
}

export async function newUserOnline(user) {

    return {
        type: "NEW_USER_ONLINE",
        user: user
    };
}

// ======== =========   CHAT ========= ===========

export async function chatMessages(chatMessages) {

    return {
        type: "CHAT_MESSAGES",
        chatMessages: chatMessages
    };
}

export async function newChatMessage(newMessage) {

    return {
        type: "NEW_CHAT_MESSAGE",
        newMessage: newMessage
    };
}

// ========== ========== ==========

export async function privateChatMessages(messages) {

    return {
        type: "PRIVATE_CHAT_MESSAGES",
        messeges: messages
    };
}


export async function notifyUser(notification){

    return {
        type: "NOTIFY_USER",
        notification: notification
    };
}


// ===== ====== ====== ======= ====== ===== ====== =====
