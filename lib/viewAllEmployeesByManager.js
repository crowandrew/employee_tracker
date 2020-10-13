const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

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
                message: "What would like to do?",
                type: "rawlist",
                choices: managerList
            }
        ]).then(function (answers) {
            connection.query(`SELECT emp.id, emp.first_name, emp.last_name, role.title, department.name AS department, role.salary, concat(mng.first_name,' ',mng.last_name) as manager FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id
            LEFT JOIN employee mng ON emp.manager_id = mng.id WHERE concat(mng.first_name,' ',mng.last_name) = ? ORDER BY emp.id`, [answers.manager], function (err, data) {
                if (err) throw err;
                console.table("\n", data);
                promptUser();
            })
        })
    }
}

module.exports = viewAllEmployeesByManager;