DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30),
);
CREATE TABLE roles(
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  deparment_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id),
  REFERENCES roles(id) ON UPDATE CASCADE,
  FOREIGN KEY (manager_id) REFERENCES employee (id) ON UPDATE CASCADE ON DELETE CASCADE
);

<!-- ------------- -->
INSERT INTO
  departments (id, name)
VALUES
  (1, "Human Resources"),
  (2, "Finance"),
  (3, "Tech Support"),
  (4, "Customer Support"),
  (5, "Janitorial");

INSERT INTO
  roles (id, title, salary, department_id)
VALUES
  (1, 'Human resources director', '90000', 1),
  (2, "Customer success engineer", '80000', 4),
  (3, "Cleanliness specialist", '100000', 5),
  (4, 'Lead financial advisor', '120000', 2),
  (5, 'Lead tech support', '200000', 3),
  (6, 'Receptionist', '45000', 4),
   (7, 'Recruiter', '85000', 1);

INSERT INTO
  employees (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'Larrey', 'Biff', 2, 4),
  (2, 'Ken', 'Mcelroy', 1, 1),
  (3, 'Jeff', 'Hagen', 6, 4),
  (4, 'Kayla', 'Preston', 4, 2),
  (5, 'Marissa', 'Leo', 7, 1),
  (6, 'Henry', 'Rollins', 3, 5);

  <!-- -------------- -->

  const mysql = require("mysql2");
const db = require('./db/connection')
const consoleTable = require('console.table');
const inquirer = require('inquirer');

const options = async () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'Welcome to our employee database! What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
                'Update employee role',
                'Delete an employee',
                
            ]
        })

        .then(function (answer) {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                default: console.log('Goodbye');
                    break;
            }
        })
};


// Viewing data
const viewDepartments = async () => {

    const departments = await db.query('SELECT id, name FROM departments');
    console.table(departments);
    options();
}


const viewRoles = async () => {

    const roles = await db.query('SELECT roles.id, title, salary AS department FROM roles JOIN departments ON roles.department_id');
    console.log(roles);
    options();
}

const viewEmployees = async () => {
    const employees = await db.query('SELECT employees.id, CONCAT(employees.first_name," ",employees.last_name) AS name, title AS job_title, salary, name AS department, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id JOIN employees manager ON manager.id = employees.manager_id');
    console.log(employees);
    options();

}

const addDepartment = async () => {
    try {
        const answers = await inquirer.prompt([{

            name: 'name',
            message: 'Department name:',
            type: 'input'

        }])
        const { name } = answers;
        db.query('INSERT INTO departments (name) VALUES (?)', [name])

    }
    catch (err) {
        console.log(err);
    }

};

<!-- ----------- -->

 else {

   console.log(new Array(100).fill("=").join("")+"\n");
    console.log(figlet.textSync('Employee Tracker \n'));
    console.log(new Array(20).fill(" ").join("")+'Created By: Kasai Preston \n');
    console.log(new Array(100).fill("=").join("")+"\n");
