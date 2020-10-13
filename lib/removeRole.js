const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

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
            connection.query(`DELETE FROM role WHERE id = ?;`, [roleId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

module.exports = removeRole;