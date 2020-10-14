require("console.table");
const connection = require("../data/connection");

function viewUtilizedBudgetByDepartment(promptUser) {
    connection.query(`SELECT department.name as department, SUM(role.salary) AS utilized_budget FROM employee emp INNER JOIN role ON emp.role_id = role.id INNER JOIN department ON role.department_id = department.id
    LEFT JOIN employee mng ON emp.manager_id = mng.id GROUP BY department.id ORDER BY department.name;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

module.exports = viewUtilizedBudgetByDepartment;