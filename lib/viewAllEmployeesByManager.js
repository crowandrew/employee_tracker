// Dependencies
// ===========================================================
const inquirer = require("inquirer");
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This creates a table view of all employees under a manager in alphabetical order based on user manager selection
// ===========================================================
function viewAllEmployeesByManager(promptUser) {
    function managerList(allEmployeesByManager) {
        connection.query(`SELECT DISTINCT concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp INNER JOIN employee mng ON emp.manager_id = mng.id ORDER BY manager;`, function (err, data) {
            if (err) throw err;
            const managerList = [];
            for (let i = 0; i < data.length; i++) {
                managerList.push(data[i].manager)
            }
            return allEmployeesByManager(managerList);
        })
    }
    managerList(allEmployeesByManager)
    function allEmployeesByManager(managerList) {
        inquirer.prompt([
            {
                name: "manager",
                message: "Which manager would you like to view?",
                type: "rawlist",
                choices: managerList
            }
        ]).then(function (answers) {
            connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee mng ON emp.manager_id = mng.id WHERE concat(mng.first_name,' ',mng.last_name) = ? ORDER BY emp.id`, [answers.manager], function (err, data) {
                if (err) throw err;
                console.table("\n", data);
                promptUser();
            })
        })
    }
}

// Exporting function for viewing all employees by manager based on user selection
// ===========================================================
module.exports = viewAllEmployeesByManager;