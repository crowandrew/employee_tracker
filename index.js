const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_tracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  promptUser();
});

function promptUser(){
    inquirer.prompt([
        {
        name:"choice",
        message:"What would like to do?",
        type:"list",
        choices:["See all songs", "Hear Baby Shark", "add custom song", "query by genre", "Quit"]
    },
    {
        name:'title',
        message:"what is the title?",
        type:"input",
        when:function(answers){
            if(answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'artist',
        message:"which artist?",
        type:"input",
        when:function(answers){
            if(answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'genre',
        message:"which genre?",
        type:"input",
        when:function(answers){
            if(answers.choice==="query by genre" ||answers.choice==="add custom song"){
                return true
            } else {
                return false
            }
        }
    }
]).then(function(answers){
        if(answers.choice==="See all songs"){
            readDb();
        }
        else if(answers.choice==="query by genre"){
          selectByGenre(answers.genre)
        }
        else if(answers.choice==="Hear Baby Shark"){
           insertBabyShark();
        }
        else if(answers.choice==="add custom song"){
            addCustomSong(answers.title,answers.artist,answers.genre);
        }
        else if(answers.choice==="Quit"){
            connection.end()
        }
    })
}