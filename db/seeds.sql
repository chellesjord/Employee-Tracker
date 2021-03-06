INSERT INTO departments (name)
VALUES
('Accounting'),
('Production'),
('Research & Dev'),
('Purchasing'),
('Marketing'),
('Human Resource');

INSERT INTO roles (title, salary, department_id)
VALUES
('Executive Management', 128535, 4),
('Director', 75802, 4),
('Specialist', 65612, 2),
('Entry-Level', 37924, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Ronald','Firbank', 1, 1),
('Virinia','Wolf', 1, 0),
('Piers','Gaveston', 2, 1),
('Charles','LeRoi', 2, 0),
('Katherine','Mainsfield', 3, 1),
('Dora','Carrington', 3, 0),
('Edward','Bellamy', 4, 1),
('Unica','Zurn', 4, 0);

INSERT INTO managers (first_name, last_name)
VALUES
('Natasha', 'Romanoff'),
('Bucky', 'Barnes'),
('Wanda', 'Maximoff');