// Dependencies
// ===========================================================
const inquirer = require("inquirer");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This adds a new role based on user input
// ===========================================================
function addRole(promptUser) {
    function departmentList(addRoleToDb) {
        connection.query(`SELECT * FROM department ORDER BY name;`, function (err, data) {
            if (err) throw err;
            const departmentList = [];
            const departmentData = data;
            for (let i = 0; i < data.length; i++) {
                departmentList.push(data[i].name)
            }
            return addRoleToDb(departmentList, departmentData);
        })
    }
    departmentList(addRoleToDb);
    function addRoleToDb(departmentList, departmentData) {
        inquirer.prompt([
            {
                name: "title",
                message: "What is the title for the role?",
                type: "input",
            },
            {
                name: "salary",
                message: "What is the salary for the new role?",
                type: "number",
            },
            {
                name: "department",
                message: "Which department for the new role?",
                type: "rawlist",
                choices: departmentList
            }
        ]).then(function (answers) {
            const [departmentId] = departmentData.filter(department => department.name === answers.department);
            connection.query(`INSERT INTO role (title, salary, department_id) VALUE (?,?,?);`, [answers.title.trim(), answers.salary,  departmentId.id], function (err, data) {
                if (err) throw err;
                promptUser();
            })
        })
    }
}

// Exporting function for adding a role
// ===========================================================
module.exports = addRole;