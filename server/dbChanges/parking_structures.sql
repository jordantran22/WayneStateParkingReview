CREATE TABLE parking_structures (
    parking_structure_id INT(6) PRIMARY KEY,
    structure_name VARCHAR(50) NOT NULL
);

INSERT INTO parking_structures 
(
 parking_structure_id, 
 structure_name
) 
VALUES 
(1, "Parking Structure 1"), 
(2, "Parking Structure 2"), 
(3, "Parking Structure 3"), 
(4, "Parking Structure 4"), 
(5, "Parking Structure 5"), 
(6, "Parking Structure 6"), 
(7, "Parking Structure 7"), 
(8, "Parking Structure 8")
;