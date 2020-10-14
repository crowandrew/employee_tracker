// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This adds a new department name based on user input
// ===========================================================
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

// Exporting function for adding a department
// ===========================================================
module.exports = addDepartment;