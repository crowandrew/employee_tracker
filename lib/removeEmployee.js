// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This removes an employee based on user input
// ===========================================================
function removeEmployee(promptUser) {
    function buildEmployeeList(removerEmployeeFromDb) {
        connection.query(`SELECT * FROM employee ORDER BY last_name;`, function (err, data) {
            if (err) throw err;
            const employeeData = data;
            const employeeList = [];
            for (let i = 0; i < data.length; i++) {
                let employee = data[i].first_name.concat(" ", data[i].last_name)
                employeeList.push(employee);
            }
            return removerEmployeeFromDb(employeeList, employeeData)
        }
        )

    }
    buildEmployeeList(removerEmployeeFromDb)
    function removerEmployeeFromDb(employeeList, employeeData) {
        inquirer.prompt([
            {
                name: "employee",
                message: "Which employee do you want to remove?",
                type: "rawlist",
                choices: employeeList
            }
        ]).then(function (answers,) {
            const [employeeFirstName, employeeLastName] = answers.employee.split(" ");
            const [employeeId] = employeeData.filter(employee => employee.first_name === employeeFirstName && employee.last_name === employeeLastName)
            connection.query(`UPDATE employee SET manager_id = null WHERE manager_id = ?;`, [employeeId.id], function (err, data) {
                if (err) throw err;
                connection.query(`DELETE FROM employee WHERE id = ?;`, [employeeId.id], function (err, data) {
                    if (err) throw err;
                    promptUser();
                })
            })
        })
    }
}

// Exporting function for removing an employee
// ===========================================================
module.exports = removeEmployee;