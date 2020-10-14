const inquirer = require("inquirer");
const connection = require("../data/connection");

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