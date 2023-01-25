CREATE DATABASE vacansy;


CREATE TABLE IF NOT EXISTS referal(
    user_id VARCHAR(50) NOT NULL,
    suggested BOOLEAN NOT NULL DEFAULT FALSE,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (user_id)
);


CREATE TABLE IF NOT EXISTS access(
    user_id VARCHAR(50) NOT NULL,
    access BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (user_id)
);


CREATE TABLE IF NOT EXISTS employers(
    user_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    age INT NOT NULL,
    sex VARCHAR(10) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    telegram VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    speciality VARCHAR(75) NOT NULL,
    time1 VARCHAR(20) NOT NULL,
    time2 VARCHAR(20) NOT NULL,
    info VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);


-- company 
CREATE TABLE IF NOT EXISTS companies(
    user_id VARCHAR(50) NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    telegram VARCHAR(50) NOT NULL,
    price VARCHAR(50) NOT NULL,
    experience VARCHAR(50) NOT NULL,
    speciality VARCHAR(75) NOT NULL,
    time1 VARCHAR(20) NOT NULL,
    time2 VARCHAR(20) NOT NULL,
    time3 VARCHAR(20) NOT NULL,
    time4 VARCHAR(20) NOT NULL,
    info VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id)
);

-- select first element from table
SELECT * FROM employers ORDER BY user_id ASC LIMIT 1;

-- delete first element from table
DELETE FROM employers ORDER BY user_id ASC LIMIT 1;

-- access
UPDATE access SET access = true WHERE access = false;