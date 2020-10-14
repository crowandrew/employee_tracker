// Dependencies
// ===========================================================
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This creates a table view of all departments with employees and their utilized budgets
// ===========================================================
function viewUtilizedBudgetByDepartment(promptUser) {
    connection.query(`SELECT department.name as department, SUM(role.salary) AS utilized_budget FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id GROUP BY department.id ORDER BY department.name;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

// Exporting function for viewing all departments with employees and their utilized budget
// ===========================================================
module.exports = viewUtilizedBudgetByDepartment;