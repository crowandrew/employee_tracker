// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");


// This adds a new employee based on user input
// ===========================================================
function addEmployee(promptUser) {
    function buildRoleAndManagerList(addEmployeeToDb) {
        function buildManagerList(buildRoleList) {
            connection.query(`SELECT * FROM employee`, function (err, data) {
                if (err) throw err;
                const managerList = [];
                const managerData = data;
                for (let i = 0; i < data.length; i++) {
                    let manager = data[i].first_name.concat(" ", data[i].last_name)
                    if (managerList.indexOf(manager) === -1) {
                        managerList.push(manager)
                    }
                }
                return buildRoleList(managerList.sort(), managerData);
            }
            )
        }
        buildManagerList(buildRoleList);
        function buildRoleList(managerList, managerData) {
            connection.query(`SELECT * FROM role ORDER BY title;`, function (err, data) {
                if (err) throw err;
                const roleData = data;
                const roleList = [];
                for (let i = 0; i < data.length; i++) {
                    roleList.push(data[i].title);
                }
                return addEmployeeToDb(roleList, roleData, managerList, managerData)
            }
            )

        }
    }
    buildRoleAndManagerList(addEmployeeToDb);
    function addEmployeeToDb(roleList, roleData, managerList, managerData) {
        inquirer.prompt([
            {
                name: "first_name",
                message: "What is the employee's first name?",
                type: "input"
            },
            {
                name: "last_name",
                message: "What is the employee's last name?",
                type: "input"
            },
            {
                name: "role",
                message: "What is the employee's role?",
                type: "rawlist",
                choices: roleList
            },
            {
                name: "manager",
                message: "Who is the employee's manager?",
                type: "rawlist",
                choices: managerList
            }
        ]).then(function (answers,) {
            const [managerFirstName, managerLastName] = answers.manager.split(" ");
            const [managerId] = managerData.filter(manager => manager.first_name === managerFirstName && manager.last_name === managerLastName)
            const [roleId] = roleData.filter(role => role.title === answers.role);
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?,?,?,?);`, [answers.first_name.trim(), answers.last_name.trim(), roleId.id, managerId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

// Exporting function for adding an employee
// ===========================================================
module.exports = addEmployee;