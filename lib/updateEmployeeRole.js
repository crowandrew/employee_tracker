const inquirer = require("inquirer");
const connection = require("../data/connection");

function updateEmployeeRole(promptUser) {
    function buildRoleAndEmployeeList(changeRoleInDb) {
        function buildEmployeeList(buildRoleList) {
            connection.query(`SELECT * FROM employee`, function (err, data) {
                if (err) throw err;
                const employeeList = [];
                const employeeData = data;
                for (let i = 0; i < data.length; i++) {
                    let employee = data[i].first_name.concat(" ", data[i].last_name);
                    employeeList.push(employee);
                }
                return buildRoleList(employeeList.sort(), employeeData);
            }
            )
        }
        buildEmployeeList(buildRoleList);
        function buildRoleList(managerList, managerData) {
            connection.query(`SELECT * FROM role ORDER BY title;`, function (err, data) {
                if (err) throw err;
                const roleData = data;
                const roleList = [];
                for (let i = 0; i < data.length; i++) {
                    roleList.push(data[i].title);
                }
                return changeRoleInDb(roleList, roleData, managerList, managerData)
            }
            )

        }
    }
    buildRoleAndEmployeeList(changeRoleInDb);
    function changeRoleInDb(roleList, roleData, employeeList, employeeData) {
        inquirer.prompt([
            {
                name: "employee",
                message: "Which employee do you want update?",
                type: "rawlist",
                choices: employeeList
            },
            {
                name: "role",
                message: "What is their new role?",
                type: "rawlist",
                choices: roleList
            }
        ]).then(function (answers) {
            const [employeeFirstName, employeeLastName] = answers.employee.split(" ");
            const [employeeId] = employeeData.filter(employee => employee.first_name === employeeFirstName && employee.last_name === employeeLastName)
            const [roleId] = roleData.filter(role => role.title === answers.role);
            connection.query(`UPDATE employee SET role_id = ? WHERE id = ?;`, [roleId.id, employeeId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

module.exports = updateEmployeeRole;