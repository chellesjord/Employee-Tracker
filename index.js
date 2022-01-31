
//const markdown = require("./generateMarkdown.js");


//array of questions for user input
const promptUser = UserData => {
    return inquirer.prompt([ 
        {
            type: "list",
            name: "taskOptVAU",
            message: `What action would you like to take?`,
            choices: ["View Departments", "View Roles", "View Employees", 
            "Add Department", "Add Roles", "Add Employees",
            "Update Department", "Update Roles", "Update Employees"]
        }
    ]).then(function(res){
        //switch case statements to help sort which funtion to go to depending on which selection the user chooses.
        switch(res){
            case "View Departments":
                viewDepart();
                break;
            case "View Roles":
                viewRole();
                break;
            case "View Employees":
                viewEmp();
                break;
            case "Add Department":
                addDepart();
                break;
            case "Add Roles":
                addRole();
                break;
            case "Add Employees":
                addEmp();
                break;
            case "Update Department":
                upDepart();
                break;
            case "Update Roles":
                upRole();
                break;
            case "Update Employees":
                upEmp();
                break;
            default: 
                text = "Please select a valid option";
                break;
        }
    })
};

//function if user selected a view option
function viewDepart() {
db.query(`SELECT id, FROM employee`, (err, rows) => {
    console.log(rows);
  });
};


//Function to initialize app
function init() {
    //start promptUser to get information about the Employee Tables
    promptUser()
    //then get the UserDAta and send it to fuctions to updates Employee tables function
    // .then(userData => {
    //     return tableNewEdits(userData);
    // });
};

//function call to initialize app
init();