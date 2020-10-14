const inquirer = require("inquirer");
const connection = require("../data/connection");

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
            connection.query(`UPDATE role SET department_id = null WHERE department_id = ?`, [departmentId.id], function (err, data) {
                if (err) throw err;      
            connection.query(`DELETE FROM department WHERE id = ?;`, [departmentId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
        })
    }
}

module.exports = removeDepartment;