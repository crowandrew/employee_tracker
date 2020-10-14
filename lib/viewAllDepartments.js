require("console.table");
const connection = require("../data/connection");

function viewAllDepartments(promptUser) {
    connection.query(`SELECT id,name AS department FROM department ORDER BY department.name;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

module.exports = viewAllDepartments;