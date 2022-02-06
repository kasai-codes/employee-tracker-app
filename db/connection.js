const mysql = require("mysql2");
const util = require('util');
const figlet = require('figlet');

const connection = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "Red240sx1994!",
  database: "employee_db"
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
  if (err) {
    throw err;

    
  } else {

   console.log(new Array(100).fill("=").join("")+"\n");
    console.log(figlet.textSync('Employee Tracker \n'));
    console.log(new Array(20).fill(" ").join("")+'Created By: Kasai Preston \n');
    console.log(new Array(100).fill("=").join("")+"\n");

    console.log('Succesfully connected to mysql');

  
  }
});

module.exports = connection;