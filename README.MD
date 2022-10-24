# My Company 

## Description 

My Company is a command-line application that allows employers to easily view and manage the departments, roles, and employees in any given company, this will help employers stay organized.

## Usage
The application will be invoked by using the following command:

```bash
node server.js
```
My Company is very simple and straight forward to use. When application starts 

- Employer is presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.

- Employer can choose to view all departments option, a formatted table showing department names and department ids will be presented.

- Employer can choose to view all roles option, the job title, role id, the department that role belongs to, and the salary for that role will be presented.

-  Employer can choose to view all employees option, a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to will be presented.

- Employer can choose to add an employees option,then the employer is prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.

- Employer can choose to add an department option, then that department is added to the database.

- Employer can choose to add a role option, then employer is prompted to enter the name, salary, and department for the role and that role is added to the database

- Employer can choose to update an employees option, then employer is rompted to select an employee to update and their new role and this information is updated in the database.

## Installation 

The following packages is needed to run this application    
Express.js
MySQL2
dotenv 
inquirer

