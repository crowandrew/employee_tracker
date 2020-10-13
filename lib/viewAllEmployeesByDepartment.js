const mysql = require("mysql");
const inquirer = require("inquirer");
const promptUser = require("..");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

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
        ]).then(function (answers,) {
            connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id WHERE department.name = ? ORDER BY emp.id`, [answers.department], function (err, data) {
                if (err) throw err;
                console.table("\n", data);
                promptUser();
            })
        })
    }
}

module.exports = viewAllEmployeesByDepartment;