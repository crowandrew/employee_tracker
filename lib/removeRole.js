// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This removes a role based on user input
// ===========================================================
function removeRole(promptUser) {
    function buildRoleList(removeRoleFromDb) {
        connection.query(`SELECT * FROM role ORDER BY title;`, function (err, data) {
            if (err) throw err;
            const roleData = data;
            const roleList = [];
            for (let i = 0; i < data.length; i++) {
                roleList.push(data[i].title);
            }
            return removeRoleFromDb(roleList, roleData)
        }
        )

    }
    buildRoleList(removeRoleFromDb)
    function removeRoleFromDb(roleList, roleData) {
        inquirer.prompt([
            {
                name: "role",
                message: "Which role do you want to remove?",
                type: "rawlist",
                choices: roleList
            }
        ]).then(function (answers,) {
            const [roleId] = roleData.filter(role => role.title === answers.role)
            connection.query(`UPDATE employee SET role_id = null WHERE role_id = ?;`, [roleId.id], function (err, data) {
                if (err) throw err;                
                connection.query(`DELETE FROM role WHERE id = ?;`, [roleId.id], function (err, data) {
                    if (err) throw err;
                    promptUser();
                })
            })
        })
    }
}

// Exporting function for removing a role
// ===========================================================
module.exports = removeRole;