const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

function removeEmployee (promptUser){
    function buildEmployeeList(removerEmployeeFromDb){
        connection.query(`SELECT * FROM employee ORDER BY last_name;`, function (err, data) {
            if (err) throw err;
            const employeeData = data;
            const employeeList = [];
            for (let i = 0; i < data.length; i++) {
                let employee = data[i].first_name.concat(" ",data[i].last_name)
                employeeList.push(employee);
            }
            return removerEmployeeFromDb(employeeList,employeeData)
    }
        )
        
    }
    buildEmployeeList(removerEmployeeFromDb)
    function removerEmployeeFromDb(employeeList,employeeData){
        
    }
    promptUser();
}

module.exports = removeEmployee;