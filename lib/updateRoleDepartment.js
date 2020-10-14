// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This updates an role's department based on user input
// ===========================================================
function updateRoleDepartment(promptUser) {
    function buildDepartmentAndRoleLost(updateRoleDepartmentInDb) {
        function departmentList(buildRoleList) {
            connection.query(`SELECT * FROM department ORDER BY name;`, function (err, data) {
                if (err) throw err;
                const departmentList = [];
                const departmentData = data;
                for (let i = 0; i < data.length; i++) {
                    departmentList.push(data[i].name)
                }
                return buildRoleList(departmentList, departmentData);
            })
        }
        departmentList(buildRoleList)
        function buildRoleList(departmentList, departmentData) {
            connection.query(`SELECT * FROM role ORDER BY title;`, function (err, data) {
                if (err) throw err;
                const roleData = data;
                const roleList = [];
                for (let i = 0; i < data.length; i++) {
                    roleList.push(data[i].title);
                }
                return updateRoleDepartmentInDb(roleList, roleData, departmentList, departmentData)
            }
            )

        }
    }
    buildDepartmentAndRoleLost(updateRoleDepartmentInDb)
    function updateRoleDepartmentInDb(roleList, roleData, departmentList, departmentData) {
        inquirer.prompt([
            {
                name: "role",
                message: "Which role do you want to update?",
                type: "rawlist",
                choices: roleList
            },
            {
                name: "department",
                message: "What is the new department for this role?",
                type: "rawlist",
                choices: departmentList
            }
        ]).then(function (answers) {
            const [roleId] = roleData.filter(role => role.title === answers.role)
            const [departmentId] = departmentData.filter(department => department.name === answers.department)
            connection.query(`UPDATE role SET department_id = ? WHERE id = ?;`, [departmentId.id, roleId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

// Exporting function for updating a role's department
// ===========================================================
module.exports = updateRoleDepartment;