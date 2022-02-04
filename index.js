const mysql = require("mysql2");
const db = require('./db/connection')
const cTable = require('console.table');
const inquirer = require('inquirer');


const viewDepartments = async() => {

    const departments = await db.query('SELECT id, name FROM departments');
    console.table(departments);

} 


const viewRoles = async() => {


} 

const viewEmployees = async() => {


} 
const addDepartment = async() => {


} 

