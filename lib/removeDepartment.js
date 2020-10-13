const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function removeDepartment(promptUser) {
    function buildDepartmentList(removeDepartmentFromDb) {
        connection.query(`SELECT * FROM department ORDER BY name;`, function (err, data) {
            if (err) throw err;
            const departmentData = data;
            const departmentList = [];
            for (let i = 0; i < data.length; i++) {
                departmentList.push(data[i].name);
            }
            return removeDepartmentFromDb(departmentList, departmentData)
        }
        )

    }
    buildDepartmentList(removeDepartmentFromDb)
    function removeDepartmentFromDb(departmentList, departmentData) {
        inquirer.prompt([
            {
                name: "department",
                message: "Which role do you want to remove?",
                type: "rawlist",
                choices: departmentList
            }
        ]).then(function (answers,) {
            const [departmentId] = departmentData.filter(department => department.name === answers.department)
            connection.query(`DELETE FROM department WHERE id = ?;`, [departmentId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

module.exports = removeDepartment;