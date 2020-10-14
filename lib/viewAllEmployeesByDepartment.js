// Dependencies
// ===========================================================
const inquirer = require("inquirer");
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This creates a table view of all employees in a department in alphabetical order based on user department selection
// ===========================================================
function viewAllEmployeesByDepartment(promptUser) {
    function managerList(allEmployeesByDepartment) {
        connection.query(`SELECT name FROM department ORDER BY name;`, function (err, data) {
            if (err) throw err;
            const departmentList = [];
            for (let i = 0; i < data.length; i++) {
                departmentList.push(data[i].name)
            }
            return allEmployeesByDepartment(departmentList);
        })
    }
    managerList(allEmployeesByDepartment);
    function allEmployeesByDepartment(departmentList) {
        inquirer.prompt([
            {
                name: "department",
                message: "Which department would you like to view?",
                type: "rawlist",
                choices: departmentList
            }
        ]).then(function (answers) {
            connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp LEFT JOIN role ON emp.role_id = role.id LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id WHERE department.name = ? ORDER BY emp.id`, [answers.department], function (err, data) {
                if (err) throw err;
                console.table("\n", data);
                promptUser();
            })
        })
    }
}

// Exporting function for viewing all employees by department based on user selection
// ===========================================================
module.exports = viewAllEmployeesByDepartment;