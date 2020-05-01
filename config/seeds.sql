USE resources_db;

-- USER
CREATE TABLE users
INSERT INTO users (email, password, createdAt, updatedAt, FieldId)
VALUES ("aroblesgalit@gmail.com", "dbpassword", NOW(), NOW(), 1);

-- FIELD
CREATE TABLE fields
INSERT INTO fields (title, createdAt, updatedAt)
VALUES ("Front-end Web Dev", NOW(), NOW()),
 ("Graphic Designer", NOW(), NOW());

-- RESOURCE
CREATE TABLE resources
INSERT INTO resources (title, description, link, imageUrl, createdAt, updatedAt, FieldId, UserId)
VALUES ("Video Tutorial", "Just a video tutorial here", "google.com", "https://via.placeholder.com/400x200", NOW(), NOW(), 1, 1),
("Video Tutorial 2", "Just a video tutorial here", "google.com", "https://via.placeholder.com/400x200", NOW(), NOW(), 1, 1);