
const db = require("./db/connection");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const figlet = require('figlet');



db.connect((error) => {
    if(error) throw error;
console.log(new Array(100).fill("=").join("")+"\n");
console.log(figlet.textSync('Employee Tracker \n'));
console.log(new Array(40).fill(" ").join("")+'Created By: Kasai Preston \n');
console.log(new Array(100).fill("=").join("")+"\n");
options();
});

const options = async () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Welcome to our employee database! What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "Exit Database",
      ],
    })

    .then(function (answer) {
      switch (answer.action) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Exit Database":
          console.log("Goodbye");
          connection.end();
          break;
      }
    });
};


const viewDepartments = async () => {
  const departments = await db.query("SELECT id, name FROM departments");
  console.table(departments);
  options();
};

const viewRoles = async () => {
  const roles = await db.query(
    "SELECT roles.id, title, salary AS department FROM roles JOIN departments ON roles.department_id"
  );
  console.log(roles);
  options();
};

const viewEmployees = async () => {
  const employees = await db.query(
    'SELECT employees.id, CONCAT(employees.first_name," ",employees.last_name) AS name, title AS job_title, salary, name AS department, CONCAT(manager.first_name," ",manager.last_name) AS manager FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id JOIN employees manager ON manager.id = employees.manager_id'
  );
  console.log(employees);
  options();
};

const addDepartment = async () => {
  try {
    const answers = await inquirer.prompt([
      {
        name: "name",
        message: "Department name:",
        type: "input",
      },
    ]);
    const { name } = answers;
    db.query("INSERT INTO departments (name) VALUES (?)", [name]);
  } catch (err) {
    console.log(err);
  }
};

const addEmployee = async () => {
  const roles = await db.query("SELECT * FROM roles");

  const employees = await db.query("SELECT * FROM employees");

  const roleChoices = roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const employeeChoices = employees.map((employee) => {
    return {
      name: employee.first_name,
      value: employee.id,
    };
  });

  try {
    const answers = await inquirer.prompt([
      {
        name: "first_name",
        message: "First name:",
        type: "input",
      },
      {
        name: "last_name",
        message: "Last name:",
        type: "input",
      },
      {
        name: "role_id",
        message: "Role",
        type: "list",
        choices: roleChoices,
      },
      {
        name: "manager_id",
        message: "Manager for new employee:",
        type: "list",
        choices: employeeChoices,
      },
    ]);
    const { first_name, last_name, role_id, manager_id } = answers;

    db.query(
      "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
      [first_name, last_name, role_id, manager_id]
    );
    console.log(answers);
    options();
  } catch (err) {
    console.log(err);
  }
};

const addRole = async () => {
  const departments = await db.query("SELECT * FROM departments");
  const choices = departments.map((department) => {
    return {
      name: department.name,
      value: department.id,
    };
  });
  try {
    const answers = await inquirer.prompt([
      {
        name: "title",
        message: "Role title:",
        type: "input",
      },
      {
        name: "salary",
        message: "Salary:",
        type: "input",
      },
      {
        name: "department_id",
        message: "Department:",
        type: "list",
        choices: choices,
      },
    ]);

    const { title, salary, department_id } = answers;
    db.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
      [title, salary, department_id]
    );
    console.log(answers);
    options();
  } catch (err) {
    console.log(err);
  }
};

const updateRole = async () => {
  const roles = await db.query("SELECT * FROM roles");
  const employees = await db.query("SELECT * FROM employees");

  const roleChoices = roles.map((role) => {
    return {
      name: role.title,
      value: role.id,
    };
  });
  const employeeChoices = employees.map((employee) => {
    return {
      name: employee.first_name,
      value: employee.id,
    };
  });
  try {
    const answers = await inquirer.prompt([
      {
        name: "employee_id",
        message: "Select employee to update:",
        type: "list",
        choices: employeeChoices,
      },
      {
        name: "role_id",
        message: "Select new role for employee:",
        type: "list",
        choices: roleChoices,
      },
    ]);
    console.log(answers);
    const { employee_id, role_id } = answers;

    db.query("UPDATE employees SET role_id = ? WHERE id = ?", [
      role_id,
      employee_id,
    ]);
    options();
  } catch (err) {
    console.log(err);
  }
};
