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

