const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function addDepartment(promptUser) {
    inquirer.prompt([
        {
            name: "department",
            message: "What is the name for the department?",
            type: "input",
        }
    ]).then(function (answers) {
        connection.query(`INSERT INTO department (name) VALUE (?);`, [answers.department.trim()], function (err, data) {
            if (err) throw err;
            promptUser();
        })
    })
}

module.exports = addDepartment;