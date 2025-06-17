-- creating the database
CREATE DATABASE IF NOT EXISTS api_school_profile;

use api_school_profile;

-- creating a table
CREATE TABLE IF NOT EXISTS user (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_sessions (
  user_id INT NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS profile (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    about VARCHAR (250) NOT NULL,
    history VARCHAR (250) NOT NULL,
    structure VARCHAR (250) NOT NULL,
    visi VARCHAR (250) NOT NULL,
    image LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (250) NOT NULL,
    description VARCHAR (250) NOT NULL,
    image LONGTEXT,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS register (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (250) NOT NULL,
    gender VARCHAR (250) NOT NULL,
    place_of_birth VARCHAR (250) NOT NULL,
    date_of_birth DATE,
    address VARCHAR (250) NOT NULL,
    parent_name VARCHAR (250) NOT NULL,
    email VARCHAR (250),
    phone VARCHAR (250),
    image_akte LONGTEXT,
    image_ijazah LONGTEXT,
    image_skhun LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Show all tables
SHOW TABLES;

-- To describe the table
describe user;
describe profile;
describe news;
describe register;