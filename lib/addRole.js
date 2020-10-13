const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

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

module.exports = addRole;