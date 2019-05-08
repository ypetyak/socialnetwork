export default function(state = {}, action) {
    // console.log("Our Actions are here: ", action);
    if (action.type == "LIST_OF_FRIENDS") {
        state = {
            ...state,
            friends: action.friends
        };
    }

    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friends:
                state.friends &&
                state.friends.filter(user => user.id != action.receiver_id)
        };
    }

    if (action.type == "ACCEPT_REQUEST") {
        state = {
            ...state,
            friends: state.friends.map(friend => {
                //console.log("out super id:", friend.id);
                //console.log("reciever ID", action.receiver_id);
                if (friend.id == action.receiver_id) {
                    //console.log("Making Friends!");
                    return { ...friend, status: (friend.status = 2) };
                } else {
                    return friend;
                }
            })
        };
    }

// ==== ===== ====== NOW WE USE SOCKET HERE ===== ======

    if (action.type == "ONLINE_USERS") {
        state = {
            ...state,
            onlineUsers: action.users
        }
    }

    if (action.type == "DISCONNECT") {
        //console.log("reciever ID", action.userId);
        //console.log("current state of users: ", state);
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => user.id != action.userId)
        }
    }

    if (action.type == "NEW_USER_ONLINE") {
        //console.log("Out nice new user: ", action.user);
        state = {
            ...state,
            onlineUsers: state.onlineUsers.concat(action.user)
        }

    }

// ===========  ========== CHAT =========== ==============

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        }
    }

    if (action.type == "NEW_CHAT_MESSAGE") {
        //console.log("Out nice new user: ", action.newMessage);
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.newMessage)
        }

    }

// =========== ============ PRIVATE CHAT ============ ============

    if (action.type == "PRIVATE_CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.messages
        }
    }

    // =====

    if (action.type == "NOTIFY_USER") {
        //console.log("NOTIFY_USER HERE", action.notification);
        state = {
            ...state,
            notification: action.notification
        };
    }

// =========== ======= ======= =========== ======= =======

    // console.log("Our state", state);
    return state;


}
