const inquirer = require("inquirer");
const connection = require("../data/connection");

function updateRoleSalary(promptUser) {
    function buildRoleList(updateRoleSalaryInDb) {
        connection.query(`SELECT * FROM role ORDER BY title;`, function (err, data) {
            if (err) throw err;
            const roleData = data;
            const roleList = [];
            for (let i = 0; i < data.length; i++) {
                roleList.push(data[i].title);
            }
            return updateRoleSalaryInDb(roleList, roleData)
        }
        )

    }
    buildRoleList(updateRoleSalaryInDb)
    function updateRoleSalaryInDb(roleList, roleData) {
        inquirer.prompt([
            {
                name: "role",
                message: "Which role do you want to update?",
                type: "rawlist",
                choices: roleList
            },
            {
                name: "salary",
                message: "What is the new salary for this role?",
                type: "number" 
            }
        ]).then(function (answers) {
            const [roleId] = roleData.filter(role => role.title === answers.role)
            connection.query(`UPDATE role SET salary = ? WHERE id = ?;`, [answers.salary, roleId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

module.exports = updateRoleSalary;