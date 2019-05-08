DROP TABLE IF EXISTS houses;


CREATE TABLE houses(
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL REFERENCES users(id),
    description VARCHAR(300),
    address VARCHAR(300),
    photo VARCHAR(300),
);

SELECT * FROM users;
