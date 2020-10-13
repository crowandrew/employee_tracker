const mysql = require("mysql");
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function updateEmployeeManager(promptUser) {
    function buildEmployeeList(changeManagerInDb) {
        connection.query(`SELECT * FROM employee`, function (err, data) {
            if (err) throw err;
            const employeeList = [];
            const employeeData = data;
            for (let i = 0; i < data.length; i++) {
                let employee = data[i].first_name.concat(" ", data[i].last_name);
                employeeList.push(employee);
            }
            return changeManagerInDb(employeeList.sort(), employeeData);
        }
        )
    }
    buildEmployeeList(changeManagerInDb);
    function changeManagerInDb(employeeList, employeeData) {
        inquirer.prompt([
            {
                name: "employee",
                message: "Which employee do you want update?",
                type: "rawlist",
                choices: employeeList
            },
            {
                name: "manager",
                message: "What is their new role?",
                type: "rawlist",
                choices: employeeList
            }
        ]).then(function (answers,) {
            const [employeeFirstName, employeeLastName] = answers.employee.split(" ");
            const [employeeId] = employeeData.filter(employee => employee.first_name === employeeFirstName && employee.last_name === employeeLastName)
            const [managerFirstName, managerLastName] = answers.manager.split(" ");
            const [managerId] = employeeData.filter(employee => employee.first_name === managerFirstName && employee.last_name === managerLastName)
            connection.query(`UPDATE employee SET manager_id = ? WHERE id = ?;`, [managerId.id, employeeId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

module.exports = updateEmployeeManager;