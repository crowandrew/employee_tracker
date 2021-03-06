DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;


CREATE TABLE department(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);