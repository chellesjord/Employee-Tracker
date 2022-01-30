// packages needed for the application
const inquirer = require("inquirer");
const fs = require("fs");
const markdown = require("./generateMarkdown.js");
const employeeTables = require("./server.js");

//array of questions for user input
const promptUser = UserData => {
    return inquirer.prompt([ 
        {
            type: "checkbox",
            name: "taskOption"
        }
    ])
}
