CREATE TABLE IF NOT EXISTS user
(
    id          INT             PRIMARY KEY AUTO_INCREMENT,
    device_id   VARCHAR(255)    UNIQUE NOT NULL,
    last_login  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    x           FLOAT           DEFAULT 0,
    y           FLOAT           DEFAULT 0
);