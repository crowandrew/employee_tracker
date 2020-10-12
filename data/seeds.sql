ROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  FOREIGN KEY (role_id) REFERENCES role(role_id),
  FOREIGN KEY (manager_id) REFERENCES employee(manager_id),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  FOREIGN KEY (department_id) REFERENCES department(department_id)
  PRIMARY KEY (id)
);

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(100),
  PRIMARY KEY (id)
);