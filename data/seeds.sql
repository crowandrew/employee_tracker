USE employee_tracker_db;

INSERT INTO department (name) values ('Sales');
INSERT INTO department (name) values ('Engineering');
INSERT INTO department (name) values ('Finance');
INSERT INTO department (name) values ('Legal');

INSERT INTO role (title, salary, department_id) values ('Sales Lead', 100000, 1);
INSERT INTO role (title, salary, department_id) values ('Salesperson', 80000, 1);
INSERT INTO role (title, salary, department_id) values ('Lead Engineer', 150000, 2);
INSERT INTO role (title, salary, department_id) values ('Software Engineer', 120000, 2);
INSERT INTO role (title, salary, department_id) values ('Accountant', 125000, 3);
INSERT INTO role (title, salary, department_id) values ('Legal Team Lead', 250000, 4);
INSERT INTO role (title, salary, department_id) values ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id) values ('John', 'Doe', 1);
INSERT INTO employee (first_name, last_name, role_id) values ('Mike', 'Chan', 2);
INSERT INTO employee (first_name, last_name, role_id) values ('Ashley', 'Rodriguez', 3);
INSERT INTO employee (first_name, last_name, role_id) values ('Kevin', 'Tupik', 4);
INSERT INTO employee (first_name, last_name, role_id) values ('Malia', 'Brown', 5);
INSERT INTO employee (first_name, last_name, role_id) values ('Sarah', 'Lourd', 6);
INSERT INTO employee (first_name, last_name, role_id) values ('Tom', 'Allen', 7);
INSERT INTO employee (first_name, last_name, role_id) values ('Christian', 'Eckenrode', 3);


UPDATE employee SET manager_id = 3 WHERE id = 1;
UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 7 WHERE id = 8;
UPDATE employee SET manager_id = 2 WHERE id = 9;

