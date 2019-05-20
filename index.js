const express = require("express");
const app = express();
const compression = require("compression");

//// ======= socket.io ================

const server = require("http").Server(app); // we require node server, so we wrap express server into node

const io = require("socket.io")(server, {origins: "https://ypetyak-socialnetwork.herokuapp.com:*"}, {transports: ['websocket']}); // we pass our wrapped server and configuartiona of our web socket. Don't forget to change this if you deploy to heroku you will need type there: "https://mysite.herokuapp.com:* "

/// ============

// let db;

// if (process.env.NODE_ENV == "production") {
//     db = process.env.DATABASE_URL;
// } else {
//     db = require("./sql/db.js");
// }

const db = require("./sql/db.js");

const bodyParser = require("body-parser");
const csurf = require("csurf");

// const secrets = require("./secrets.json");

const config = require("./config");
const s3 = require("./s3");
const {hashPassword, checkPass} = require("./public/hashing.js");

app.use(express.static("./public"));
app.use(compression());
app.use(require("cookie-parser")());

// ==============   COOKIES      =================
// === WE HAVE REPLACED OUR COOKIE SESSION WITH VERSION FOR SOCKET.IO ==

const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`, // maybe it will be "socialnetwork"
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// ====

app.use(require("body-parser").json());

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// ============= MIDDLEWARE BOILERPLATE FOR FILE UPLOAD ==============

var multer = require("multer"); // will do some magic to upload files to our computer
var uidSafe = require("uid-safe"); // takes the files we upload and gives them a completely new name
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        // where to save files into
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            // 24 is a number of characters we tell uidSafe to create for new files
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    // we pass file to multer
    storage: diskStorage,
    limits: {
        fileSize: 2097152 /// the only limit to the files we have, its size, around 2 mb.
        // it will work without limits, but we do this for security reasons.
    }
});

// ====================================================================

///////////////

if (process.env.NODE_ENV != "production") {
    app.use("/bundle.js", require("http-proxy-middleware")({target: "http://localhost:8081/"}));
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    // console.log("req.body: ", req.body);

    let {first, last, email, password} = req.body;
    // console.log(first, last, email, password);

    hashPassword(password).then(hash => {
        // console.log(hash);
        db.createUser(first, last, email, hash).then(id => {
            req.session.userId = id.rows[0].id;
            res.json({success: true});
        }).catch(error => {
            console.log("Error in POST Registration: ", error);
            res.json({success: false});
        });
    });
});

app.post("/login", (req, res) => {
    // console.log("req.body: ", req.body);

    let {email, password} = req.body;
    // console.log(email, password);

    db.returnPassword(email).then(results => {
        // console.log("Resutls from password request: ", results);
        var savedPas = results.rows[0].password;
        var id = results.rows[0].id;

        checkPass(password, savedPas).then(results => {
            if (results) {
                req.session.userId = id;
                res.json({success: true});
            }
        });
    }).catch(error => {
        console.log("Error in POST /login: ", error);

        res.json({success: false});
    });
});

app.get("/user", (req, res) => {
    var id = req.session.userId;
    // console.log("Id is here: ", id);

    db.getUserInfo(id).then(results => {
        // console.log("our resutls:", results);
        res.json(results.rows[0]);
    }).catch(error => {
        console.log("Error in getting user info from the table: ", error);
        res.json({success: false});
    });
});

/// ============ UPLOAD IMAGE TO DATABASE =================

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    // console.log("ID is here: ", req.session.userId);
    db.updateImage(config.s3Url + req.file.filename, req.session.userId).then(results => {
        // req.session.avatar_url = config.s3Url + req.file.filename;
        // console.log("Results after uploading Images: ", results);
        res.json(results.rows[0]);
    }).catch(err => {
        console.log("Error in writeFileTo: ", err);
        res.status(500).json({success: false});
    });
});

// ============= ============== ===========  ==========   ==========

// =============  ============  UPLOAD BIO INTO THE DATABASE =========

app.get("/profile", (req, res) => {
    console.log("Bio in Server: ", req.body);
    db.uploadBio(req.body.bio, req.session.userId).catch(err => {
        console.log("Error in POST profile, Bio: ", err);
        res.status(500).json({success: false});
    });
});

//// =============  =========== GET OTHER USERS PROFILES ========== ============

app.get("/get-user/:userId", (req, res) => {
    var userId = req.params.userId;
    db.getUsersProfileData(userId).then(results => {
        res.json(results.rows[0]);
    }).catch(error => {
        console.log("Error in GET users profile info", error);
    });
});

//// ========== =========== LIST OF ALL USERS? =========    ==========

app.get("/getListOfUsers", (req, res) => {
    db.getAllUsers().then(results => {
        res.json(results.rows);
    }).catch(error => {
        console.log("Error in GET users profile info", error);
    });
});

/////// ============ ========= FRIEND OF A FRIEND ========== ============

app.get("/friendsOfAFriend", (req, res) => {

    var friendId = req.query.friendId;
    var userId = req.session.userId;

    // console.log("Friends:", friendId, userId);

    db.getFriendsOfAFriend(friendId).then(results => {
        console.log("Results of Friends of a Friend: ", results.rows);
        res.json(results.rows);
    }).catch(error => {
        console.log("Error in GET friends of a friend", error);
    });
});


/////// ============= ===========  FRIEND REQUEST BUTTON ===============

app.get("/makeFriends", (req, res) => {
    // console.log("Current User:", req.session.userId);
    // console.log("req in Request", req.query.receiver_id);
    var receiver_id = req.query.receiver_id;
    var sender_id = req.session.userId;
    db.checkIfFriends(receiver_id, sender_id).then(results => {
        // console.log("Request for Friendships!!!: ", results.rows[0]);
        res.json(results.rows[0]);
    }).catch(error => {
        console.log("Error in GET FRIEND BUTTON STATUS", error);
    });
});

app.post("/friendRequest", (req, res) => {
    var status = req.body.status;
    var sender_id = req.session.userId;
    var receiver_id = req.body.receiver_id;

    if (status == 1) {
        db.newFriendRequest(status, receiver_id, sender_id).then(results => {
            // console.log("Result In new Making Friend row", results.rows[0]);
            res.json(results.rows[0]);
        });
    } else {
        db.createFriendRequest(status, receiver_id, sender_id).then(results => {
            // console.log("Results form sending request", results.rows[0]);
            res.json(results.rows[0]);
        });
    }
});

app.post("/deleteFriendRequest", (req, res) => {
    // console.log("Delete your friend", req.body);

    var sender_id = req.session.userId;
    // console.log(sender_id);
    var receiver_id = req.body.receiver_id;
    // console.log(receiver_id);

    db.deleteFriendRequest(receiver_id, sender_id).then(() => {
        res.json("");
    });
});

// ============ =========== Logout =============    ============

app.post("/logout", (req, res) => {
    req.session = null;
    // req.session.destroy;
    res.redirect("/welcome");
});

/////// ============ ========== REQUEST IN REDUX FOR LIST OF FRIENDS ========

app.get("/listOfFriends", (req, res) => {
    var user_id = req.session.userId;
    db.receiveFriends(user_id).then(results => {
        // console.log("List of Friends", results.rows);
        res.json(results.rows);
    }).catch(error => {
        console.log("Error in GET list of friends", error);
    });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        return res.redirect("/nextpage");
    }
    res.sendFile(__dirname + "/index.html");
});

app.get("*", function(req, res) {
    // console.log("Something happening");
    if (!req.session.userId) {
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/index.html");
});

// ======== OUR SERVER LISTEN IS HERE ======== ========= ==========
// BECAUSE OF THE SOCKET.IO WE NEED TO CHANGE app.listen TO server.listen

server.listen(process.env.PORT || 8080, () => console.log("Server is listening."));

// All of our functionality for socket will be incide of connection.

// Create and object ot follow who is online

let onlineUsers = {};

io.on('connection', function(socket) {

    // console.log(`socket with the id ${socket.id} is now connected`);

    if (!socket.request.session || !socket.request.session.userId) {
        return socket.disconnect(true);
    }

    // store socketid and userid in wariables

    const userId = socket.request.session.userId;
    const socketId = socket.id;

    // add socket id with user id to the object
    onlineUsers[socketId] = userId;

    let arrayOfUserIds = Object.values(onlineUsers); // gives an array of all righthand values of the Object
    // put to DB

    db.getUsersByIds(arrayOfUserIds).then(results => {
        // now we have to take this results and emit them.
        socket.emit('onlineUsers', results.rows);
    });

    //      we can also emit to everyone but the person who has just connected

    if (arrayOfUserIds.filter(id => id == socket.request.session.userId).length == 1) {
        db.getUserInfo(socket.request.session.userId).then(results => {
            socket.broadcast.emit('newUserOnline', results.rows);
        });
    }

    // ====== ======= CHAT ========== ========== ==========

    db.getRecentMessages().then(results => {
        socket.emit('chatMessages', results.rows);
    });


    socket.on("privateChat", data => {
        db.getPrivateChatMessages(userId, data).then(results => {
            socket.emit('privateChatMessages', results.rows);
        }).catch(error => {
            console.log("Error in Private Chat Messages Get: ", error);
        });
    });

    socket.on("chat", message => {

        db.saveChatMsg(userId, message).then(({rows}) => {

            let userdet = Object.assign(rows[0]);

            db.getUsersProfileData(userId).then(({rows}) => {
                // console.log("userdet:", userdet);
                io.sockets.emit("newChatMessage", Object.assign({}, userdet, rows[0]));
            }).catch(function(err) {
                console.log("Error occured in getting last joined user details", err);
            });
        }).catch(function(err) {
            console.log("Error occured in getting chat message", err);
        });
    });


    // =======

    socket.on("friendRequestNotification", data => {
        // console.log("New friends? ,", data);

        for (var key in onlineUsers) {
            // console.log(onlineUsers[key]);
     		if (onlineUsers[key] == data) {
                // console.log("KEY", key);
        		io.sockets.sockets[key].emit("notification", {
            		notification: true,
                    message: "New Friend Request!",
                });
            }
        }
    });

    // ======== ======== ========= ======== ======= ======

    socket.on('disconnect', function() {

        delete onlineUsers[socket.id];

        console.log("DISCONNECT: ", onlineUsers);
        console.log("CHECK DISCONNECT", Object.values(onlineUsers).includes(userId));

        if (!Object.values(onlineUsers).includes(userId)) {
            console.log("Id is not there");
            console.log(`socket with the id ${socket.id} is now disconnected`);

            io.sockets.emit('disonnect', userId);
        }

        // in this situation there is no difference between emit and broadcast
        // plurar if io.sockets

    });

});

