// Dependencies
// ===========================================================
require("console.table");

// Connection to MySql server
// ===========================================================
const connection = require("../data/connection");

// This creates a table view of all departments in alphabetical order
// ===========================================================
function viewAllDepartments(promptUser) {
    connection.query(`SELECT id,name AS department FROM department ORDER BY department.name;`, function (err, data) {
        if (err) throw err;
        console.table("\n",data);
        promptUser();
    })
}

// Exporting function for viewing all departments
// ===========================================================
module.exports = viewAllDepartments;