const inquirer = require('inquirer');
const db = require('../index')

const main = async () => {
    const viewAllDept = await inquirer.prompt(
        {
            type: 'list',
            name: 'start',
            message: 'Please select one of the following options',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        })
    if (viewAllDept.start === 'view all departments') {
        db.query((`SELECT id, name FROM department`), (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            main();
        })
    }
    if (viewAllDept.start === 'view all roles') {
        db.query((`SELECT role.title AS job_title, role.id as role_id, department.name AS department, role.salary 
                    FROM role 
                    JOIN department ON role.department_id=department.id`), (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            main();
        })
    }
    if (viewAllDept.start === 'view all employees') {
        //need to figure out how to do inner join to output manager names instead of manager id #
        db.query((`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, employee.manager_id
                    FROM employee 
                    JOIN role on employee.role_id=role.id
                    JOIN department ON role.department_id=department.id
                    `), (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.table(rows);
            main();
        })
    }
    if (viewAllDept.start === 'add a department') {
        const addDept = await inquirer.prompt(
            {
                type: 'input',
                name: 'dept',
                message: 'Please enter the name of the department you would like to add',
                validate: dept => {
                    if (dept) {
                        return true;
                    } else {
                        console.log('Please enter the name of the department you would like to add')
                    }
                }
            }
        )
        let value = addDept.dept.toString();
        db.query(`INSERT INTO department (name) VALUES ("${value}")`, (err, result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        })
    }
    if (viewAllDept.start === 'add a role') {
        const newRole = {}
        const roleTitle = await inquirer.prompt(
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Please enter the role title',
                validate: role => {
                    if (role) {
                        return true;
                    } else {
                        console.log('Please enter the title of the role you would like to add')
                    }
                }
            }
        )
        newRole.roleTitle = roleTitle.roleTitle;
        const salary = await inquirer.prompt(
            {
                type: 'number',
                name: 'salary',
                message: 'Please enter the salary for this role',
                validate: sal => {
                    if (sal) {
                        return true;
                    } else {
                        console.log('Please enter the salary for this role (number)')
                    }
                }

            }
        )
        newRole.salary = salary.salary;
        const dept = await inquirer.prompt(
            {
                type: 'input',
                name: 'department',
                message: 'Please enter the department for this role',
                validate: dept => {
                    if (dept) {
                        return true;
                    } else {
                        console.log('Please enter the department for this role')
                    }
                }

            }
        )
    }
}

main();
