const spicedPg = require("spiced-pg");
const secrets = require("../secrets.json");

const dbUrl = secrets.dbUrl;

const db = spicedPg(dbUrl);

exports.createUser = (first, last, email, password) => {
    const q = `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `;
    return db.query(q, [
        first || null,
        last || null,
        email || null,
        password || null
    ]);
};

exports.returnPassword = email => {
    const q = `
        SELECT password, id
        FROM users
        WHERE email = ($1);

    `;
    return db.query(q, [email]);
};

exports.getUserInfo = id => {
    const q = `
    SELECT first, last, id, bio, avatar_url
    FROM users
    WHERE id = ($1);
    `;
    return db.query(q, [id]);
};

exports.updateImage = (image_url, id) => {
    const q = `
    UPDATE users
    SET avatar_url = $1
    WHERE id = $2
    RETURNING avatar_url
    `;
    return db.query(q, [image_url, id]);
};

exports.uploadBio = (bio, id) => {
    const q = `
    UPDATE users
    SET bio = $1
    WHERE id = $2
    `;
    return db.query(q, [bio, id]);
};

exports.getUsersProfileData = id => {
    const q = `
    SELECT first, last, id, bio, avatar_url
    FROM users
    WHERE id = ($1);
    `;
    return db.query(q, [id]);
};

exports.getAllUsers = () => {
    const q = `
    SELECT first, last, id, bio, avatar_url
    FROM users
    `;
    return db.query(q);
};

exports.checkIfFriends = (receiver_id, sender_id) => {
    const q = `
    SELECT receiver_id, sender_id, status
    FROM friendships
    WHERE (receiver_id = $1 AND sender_id =$2)
    OR (receiver_id = $2 AND sender_id = $1
    )
    `;
    return db.query(q, [receiver_id, sender_id]);
};

exports.createFriendRequest = (status, receiver_id, sender_id) => {
    const q = `
    UPDATE friendships
    SET status = $1
    WHERE (receiver_id =$2 AND sender_id =$3)
    OR (receiver_id =$3 AND sender_id = $2)
    RETURNING status
    `;
    return db.query(q, [status, receiver_id, sender_id]);
};

exports.newFriendRequest = (status, receiver_id, sender_id) => {
    const q = `
    INSERT INTO friendships (status, receiver_id, sender_id)
    VALUES ($1, $2, $3)
    RETURNING status
    `;
    return db.query(q, [status, receiver_id, sender_id]);
};

exports.deleteFriendRequest = (receiver_id, sender_id) => {
    const q = `
    DELETE FROM friendships
    WHERE (receiver_id =$1 AND sender_id =$2)
    OR (receiver_id =$2 AND sender_id = $1)
    `;
    return db.query(q, [receiver_id, sender_id]);
};

exports.receiveFriends = id => {
    const q = `
    SELECT users.id, first, last, avatar_url, status
    FROM friendships
    JOIN users
    ON (status = 1 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)
`;
    return db.query(q, [id]);
};


////

exports.getUsersByIds = arrayOfIds => {
    const q = `SELECT first, last, id, bio, avatar_url FROM users WHERE id = ANY($1)`;
    return db.query(q, [arrayOfIds]);
}

// ============= =========== CHAT ========== ===========

exports.getRecentMessages = () => {
    const q = `
    SELECT users.id, first, last, avatar_url, ts, message, chat.id as chatid
    FROM chat
    JOIN users
    ON chat.userId = users.id
    ORDER BY chat.id ASC
    LIMIT 10;
    `;

    return db.query(q)
}

    exports.saveChatMsg = (userId, message) => {
    console.log("in save chat:", message);
    var q = `
    INSERT INTO chat (userId ,message)
	VALUES($1,$2)
    RETURNING id as chatid, userID, ts, message`;

    return db.query(q, [userId || null, message || null]);
};


// ========== Make Request for Friend of a Friend =============

exports.getFriendsOfAFriend = (friendId) => {
    var q = `
    SELECT users.id, users.first, users.last, users.avatar_url, friendships.status
    FROM friendships
    JOIN users
    ON (status = 2 AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 2 AND sender_id = $1 AND receiver_id = users.id)

    `;

    return db.query(q, [friendId])
}

// ============= GET ALL EVENTS ===================



// ======== Private Chat ========== ===========

exports.getPrivateChatMessages = (userId, friendId) => {
    var q = `


    `;
    return db.query(q, {friendId})
}
