const mysql = require("mysql2");
const util = require('util');
const chalk = require('chalk');
const figlet = require('figlet');

const connection = mysql.createConnection({
  host: "localhost",
 
  user: "root",
  
  password: "Red240sx1994!",
  database: "employees"
});

connection.query = util.promisify( connection.query );

connection.connect(function (err) {
  if (err) { console.log(chalk.yellow.bold(`====================================================================================`));
  console.log(``);
  console.log(chalk.greenBright.bold(figlet.textSync('Employee Tracker')));
  console.log(``);
  console.log(`                                                          ` + chalk.greenBright.bold('Created By: Kasai Preston'));
  console.log(``);
  console.log(chalk.yellow.bold(`====================================================================================`));

    throw err;
   
  } else {
    console.log('Succesfully connected to mysql')
  }
});

module.exports = connection;