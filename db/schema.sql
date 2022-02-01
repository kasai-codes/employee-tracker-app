DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  department_name VARCHAR(30),
  PRIMARY KEY(id)
);

CREATE TABLE roles(
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  deparment_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id),
  REFERENCES roles(id) ON UPDATE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES 
  employee (id) ON UPDATE CASCADE ON DELETE CASCADE
);