const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

// This file leads to a class we've created to contain all our database queries
const db = require("./db");
const connection = require('./db/connection');
const { query } = require("./db/connection");

// Use this function to display the ascii art logo and to begin the main prompts
function init() {


  loadMainPrompts()
}
// Here we load the initial prompts with a series of options. The first option is provided for you.
function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        {
          name: "View All Employees",
          value: "VIEW_EMPLOYEES"
        },
        {
          name: "View All DEPARTMENTS",
          value: "VIEW_DEPARTMENTS"
        },
        {
          name: "View All ROLES",
          value: "VIEW_ROLES"
        },
        {
          name: "ADD AN EMPLOYEE",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "ADD A DEPARTMENT",
          value: "ADD_DEPARTMENTS"
        },
        {
          name: "ADD A ROLE",
          value: "ADD A ROLE"
        }, {
          name: "UPDATE AN EMPLOYEE",
          value: "UPDATE_EMPLOYEE"
        },
      ]
    }

  ]).then(res => {
    let choice = res.choice;
    // Call the appropriate function depending on what the user chose

    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "UPDATE_EMPLOYEE":
        updateEmployee();
        break;
      case "ADD_DEPARTMENTS":
        addDepartment();
        break;
      case "ADD A ROLE":
        addRole();

    }
  }
  )
}




/* ======= Controllers ============================================================ */

// Here is a function which handles the first prompt option:  View all employees
function viewEmployees() {

  // Here we call the method in the db file for finding all employees.
  // we get the result back, and then display the result 
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function viewDepartments() {

  db.findAllDeparments()
    .then(([rows]) => {
      let depatment = rows;
      console.log("\n");
      console.table(depatment);
    })
    .then(() => loadMainPrompts())

}

function viewRoles() {

  db.findAllRoles()


    .then(([rows]) => {
      let role = rows;
      console.log("\n");
      console.table(role);
    })
    .then(() => loadMainPrompts());
}


/* ======= END Controllers ============================================================ */

function addEmployee() {

  connection.query('select * from role', (err, res) => {


    prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the new emolyee first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the new emolyee last name?",
      },
      {
        type: "list",
        name: "title",
        message: "What is the new employee role?",
        choices: res.map(role => role.title),
      },
      {
        type: "input",
        name: "manager",
        message: "enter manager id number?",
      },
    ])
      .then(data => {
        const roletilte = res.find(role => role.title === data.title)


        connection.query('insert into employee set ?', {
          first_name: data.firstName, last_name: data.lastName, role_id: roletilte.id, manager_id: data.manager
        })
        loadMainPrompts()
      })
  })

}



function addDepartment() {
  connection.query('select * from department', (err, res) => {

    prompt([
      {
        type: "input",
        name: "department",
        message: "please enter department name",
      },
    ])
      .then(data => {
        
        connection.query('insert into department set ?', {
          name: data.department
        })
        loadMainPrompts()
      })
  })
}

function addRole() {
  connection.query('select * from department', (err, res) => {

  prompt([
    {
      type: "input",
      name: "title",
      message: "Enter name of role",
    },
    {
      type: "number",
      name: "salary",
      message: "Please enter salary",
    },
    {
      type: "list",
      name: "department",
      message: "Please choose department",
      choices: res.map(department => department.name),
    }
  ])
    .then(data => {
      const departmentname= res.find(department => department.name === data.department)

      connection.query('insert into role set ?', {
        title: data.title, salary: data.salary, department_id: departmentname.id
      })
      loadMainPrompts()
      
    })
})
}


function updateEmployee() {
  connection.query('select * from employee', (err, res) => {

    prompt([
      {
        type: "list",
        name: "choice",
        message: "Please select an employee?",
        choices: res.map(employee => employee.first_name)

      },
    ])
      .then(data => {
        const chosenemplyee = res.find(employee => employee.first_name === data.choice)

        connection.query('select * from role', (err, res) => {
          prompt([
            {
              type: "list",
              name: "title",
              message: "Please select an employee title?",
              choices: res.map(role => role.title)
            },
          ])
            .then(data => {
              const chosenrole = res.find(role => role.title === data.title)

              connection.query('UPDATE EMPLOYEE set role_id = ? where id = ? ', [chosenrole.id, chosenemplyee.id])
              loadMainPrompts()
            })

        })

      })

  })
}










// Everything starts here!
init();