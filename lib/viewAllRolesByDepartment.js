// Dependencies
// ===========================================================
const inquirer = require("inquirer");
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");


// This creates a table view of all roles in a department in alphabetical oder based on user selection
// ===========================================================
function viewAllRolesByDepartment(promptUser) {
    function departmentList(allEmployeesByDepartment) {
        connection.query(`SELECT * FROM department ORDER BY name;`, function (err, data) {
            if (err) throw err;
            const departmentList = [];
            const departmentData = data;
            for (let i = 0; i < data.length; i++) {
                departmentList.push(data[i].name)
            }
            return allEmployeesByDepartment(departmentList,departmentData);
        })
    }
    departmentList(allEmployeesByDepartment);
    function allEmployeesByDepartment(departmentList,departmentData) {
        inquirer.prompt([
            {
                name: "department",
                message: "Which department would you like to view?",
                type: "rawlist",
                choices: departmentList
            }
        ]).then(function (answers) {
            const [departmentId] = departmentData.filter(department => department.name === answers.department);
            connection.query(`SELECT role.id, role.title, role.salary FROM role WHERE department_id = ? ORDER BY role.title;`, [departmentId.id], function (err, data) {
                if (err) throw err;
                console.table("\n", data);
                promptUser();
            })
        })
    }
}

// Exporting function for viewing all roles by department based on user input
// ===========================================================
module.exports = viewAllRolesByDepartment;