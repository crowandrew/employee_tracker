const inquirer = require("inquirer");
const viewAllEmployees = require("./lib/viewAllEmployees");
const viewAllEmployeesByDepartment = require("./lib/viewAllEmployeesByDepartment");
const viewAllEmployeesByManager = require("./lib/viewAllEmployeesByManager");
const addEmployee = require("./lib/addEmployee");
const removeEmployee = require("./lib/removeEmployee");
const updateEmployeeRole = require("./lib/updateEmployeeRole");
const updateEmployeeManager = require("./lib/updateEmployeeManager");
const viewAllRoles = require("./lib/viewAllRoles");
const viewAllRolesByDepartment = require("./lib/viewAllRolesByDepartment");
const addRole = require("./lib/addRole");
const removeRole = require("./lib/removeRole");
const updateRoleDepartment = require("./lib/updateRoleDepartment");
const updateRoleSalary = require("./lib/updateRoleSalary");
const viewAllDepartments = require("./lib/viewAllDepartments");
const addDepartment = require("./lib/addDepartment");
const removeDepartment = require("./lib/removeDepartment");
const viewUtilizedBudgetByDepartment = require("./lib/viewUtilizedBudgetByDepartment");

function promptUser() {
    inquirer.prompt([
        {
            name: "choice",
            message: "What would like to do?",
            type: "rawlist",
            choices: ["Quit","View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager","View All Roles", "View All Roles by Department", "Add Role", "Remove Role", "Update Role Department", "Update Role Salary", "View All Departments", "Add Department", "Remove Department","View Utilized Budget By Department"]
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
                viewAllRolesByDepartment(promptUser);
                break;
            case "Add Role":
                addRole(promptUser);
                break;
            case "Remove Role":
                removeRole(promptUser);
                break;
            case "Update Role Department":
                updateRoleDepartment(promptUser);
                break;
            case "Update Role Salary":
                updateRoleSalary(promptUser);
                break;
            case "View All Departments":
                viewAllDepartments(promptUser);
                break;
            case "Add Department":
                addDepartment(promptUser);
                break;
            case "Remove Department":
                removeDepartment(promptUser);
                break;
            case "View Utilized Budget By Department":
                viewUtilizedBudgetByDepartment(promptUser);
                break;
            case "Quit":
                // connection.end();
                process.exit();
            default:
                promptUser();
                break;
        }
    })
}


promptUser();