export default function(state = {}, action) {
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
                if (friend.id == action.receiver_id) {
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
        };
    }

    if (action.type == "DISCONNECT") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(user => user.id != action.userId)
        };
    }

    if (action.type == "NEW_USER_ONLINE") {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.concat(action.user)
        };
    }

    // ===========  ========== CHAT =========== ==============

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == "NEW_CHAT_MESSAGE") {
        state = {
            ...state,
            chatMessages: state.chatMessages.concat(action.newMessage)
        };
    }

    // =========== ============ PRIVATE CHAT ============ ============

    if (action.type == "PRIVATE_CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.messages
        };
    }

    // =========== ============ NOTIFY USER ============ ============

    if (action.type == "NOTIFY_USER") {
        state = {
            ...state,
            notification: action.notification
        };
    }

    return state;
}
