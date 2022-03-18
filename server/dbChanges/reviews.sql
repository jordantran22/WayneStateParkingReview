CREATE TABLE reviews (
review_id INT(6) UNSIGNED AUTO_INCREMENT,
user_id INT(6) NOT NULL,
parking_structure_id INT(6) NOT NULL,
review_text VARCHAR(300) NOT NULL,
review_rating DECIMAL(2, 1) NOT NULL,
review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
is_deleted BOOLEAN,
PRIMARY KEY (review_id),
KEY(user_id),
KEY(parking_structure_id)
);