DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chat;
DROP TABLE IF EXISTS privateChat;
DROP TABLE IF EXISTS users;


CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(200) NOT NULL,
    last VARCHAR(200) NOT NULL,
    avatar_url VARCHAR(300),
    bio VARCHAR(500),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

SELECT * FROM users;

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id),
    receiver_id INT NOT NULL REFERENCES users(id),
    status INT NOT NULL DEFAULT 1
);

SELECT * FROM friendships;
