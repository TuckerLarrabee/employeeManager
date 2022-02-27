INSERT INTO department (name)
VALUES ('Sales'),
	('Finance'),
    ('Engineering'),
    ('Legal');
    
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 65000, 1),
		('Accountant', 85000, 2),
        ('Software Engineer', 90000, 3),
        ('Lawyer', 100000, 4);
    
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Rick', 'Smith', 1),
		('Bob', 'Johnson', 2),
        ('Mike', 'Chan', 3),
        ('Kevin', 'Tupik', 4);
        
        
UPDATE employee 
SET manager_id = 2
WHERE id = 1;

UPDATE employee 
SET manager_id = 3
WHERE id = 2;





