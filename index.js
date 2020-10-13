const mysql = require("mysql");
const inquirer = require("inquirer");
const viewAllEmployees = require("./lib/viewAllEmployees");
const viewAllEmployeesByDepartment = require("./lib/viewAllEmployeesByDepartment");
const viewAllEmployeesByManager = require("./lib/viewAllEmployeesByManager");
const addEmployee = require("./lib/addEmployee");
const removeEmployee = require("./lib/removeEmployee");
const updateEmployeeRole = require("./lib/updateEmployeeRole");
const updateEmployeeManager = require("./lib/updateEmployeeManager");
const viewAllRoles = require("./lib/viewAllRoles");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptUser();
});

function promptUser() {
    inquirer.prompt([
        {
            name: "choice",
            message: "What would like to do?",
            type: "rawlist",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "View All Roles", "View All Roles by Department", "Add Role", "Remove Role", "Update Role Department", "Update Role Salary", "View All Departments", "Add Department", "Remove Department", "View Utilized Budget By Department", "Quit"]
        }
    ]).then(function (answers) {
        switch (answers.choice) {
            case "View All Employees":
                viewAllEmployees(promptUser);
                break;
            case "View All Employees By Department":
                viewAllEmployeesByDepartment(promptUser);
                break;
            case "View All Employees By Manager":
                viewAllEmployeesByManager(promptUser);
                break;
            case "Add Employee":
                addEmployee(promptUser);
                break;
            case "Remove Employee":
                removeEmployee(promptUser);
                break;
            case "Update Employee Role":
                updateEmployeeRole(promptUser);
                break;
            case "Update Employee Manager":
                updateEmployeeManager(promptUser);
                break;
            case "View All Roles":
                viewAllRoles(promptUser);
                break;
            case "View All Roles by Department":
                console.log("viewAllRolesByDepartment");
                promptUser();
                break;
            case "Add Role":
                console.log("addRole");
                promptUser();
                break;
            case "Remove Role":
                console.log("removeRole");
                promptUser();
                break;
            case "Update Role Department":
                console.log("updateRoleDepartment");
                promptUser();
                break;
            case "Update Role Salary":
                console.log("updateRoleSalary");
                promptUser();
                break;
            case "View All Departments":
                console.log("viewAllDepartments");
                promptUser();
                break;
            case "Add Department":
                console.log("addDepartment");
                promptUser();
                break;
            case "Remove Department":
                console.log("removeDepartment");
                promptUser();
                break;
            case "View Utilized Budget By Department":
                console.log("viewUtilizedBudgetByDepartment");
                promptUser();
                break;
            case "Quit":
                connection.end();
                break;
            default:
                promptUser();
                break;
        }
    })
}

module.exports = promptUser;