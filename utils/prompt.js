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
            console.log("========================")
            console.table(rows);
            console.log("========================")
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
            console.log("========================")
            console.table(rows);
            console.log("========================")
            main();
        })
    }
    if (viewAllDept.start === 'view all employees') {
                db.query((`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                    FROM employee 
                    LEFT JOIN role on employee.role_id = role.id 
                    LEFT JOIN department on role.department_id = department.id 
                    LEFT JOIN employee manager on manager.id = employee.manager_id;
                    `), (err, rows) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("========================")
            console.table(rows);
            console.log("========================")
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
            console.log("========================")
            console.log(result)
            console.log("========================")
            main();
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
                type: 'list',
                name: 'department',
                message: 'Please select the department this role corresponds to',
                choices: ["Sales", "Finance", "Engineering", "Legal"]
            })
            if (dept.department === 'Sales') {
                newRole.department = 1
            };
            if (dept.department === 'Finance') {
                newRole.department = 2
            };
            if (dept.department === 'Engineering') {
                newRole.department = 3
            };
            if (dept.department === 'Legal') {
                newRole.department = 4
            };
        console.log(newRole)
        db.query(`INSERT INTO role (title, salary, department_id)
                    VALUES ("${newRole.roleTitle}", "${newRole.salary}", "${newRole.department}")`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
    }
    //add new employee
    if (viewAllDept.start === 'add an employee') {
        const newEmploy = {}
        const addEmployeeFirst = await inquirer.prompt(
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter the first name of the employee you would like to add',
                validate: firstName => {
                    if (firstName) {
                        return true;
                    } else {
                        console.log('Please enter the first name of the employee you would like to add')
                    }
                }
            })
        newEmploy.firstName = addEmployeeFirst.firstName;
        const addEmployeeLast = await inquirer.prompt(
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter the last name of the employee you would like to add',
                validate: lastName => {
                    if (lastName) {
                        return true;
                    } else {
                        console.log('Please enter the last name of the employee you would like to add')
                    }
                }
            })
        newEmploy.lastName = addEmployeeLast.lastName
        const addEmployeeRole = await inquirer.prompt(
            {
               type: 'list',
               name: 'role',
               message: "Please select the role of the employee you would like to add",
               choices: ["Salesperson", "Accountant", "Software Engineer", "Lawyer"]
            })
                if (addEmployeeRole.role === 'Salesperson') {
                    newEmploy.role = 1
                };
                if (addEmployeeRole.role === 'Accountant') {
                    newEmploy.role = 2
                };
                if (addEmployeeRole.role === 'Software Engineer') {
                    newEmploy.role = 3
                };
                if (addEmployeeRole.role === 'Lawyer') {
                    newEmploy.role = 4
                };
        const addEmployeeManager = await inquirer.prompt(
            {
               type: 'list',
               name: 'manager',
               message: "Please select the manager of the employee you would like to add",
               choices: ["Bob Johnson", "Mike Chan", "No manager"]
            })
            if (addEmployeeManager.manager === 'Bob Johnson') {
                newEmploy.manager = 1
            };
            if (addEmployeeManager.manager === 'Mike Chan') {
                newEmploy.manager = 2
            };
            if (addEmployeeManager.manager === 'No manager') {
                newEmploy.manager = null
            };
            console.log(newEmploy) 

            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${newEmploy.firstName}", "${newEmploy.lastName}", "${newEmploy.role}", "${newEmploy.manager}")`, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
    }
    
    //update employee role
    if (viewAllDept.start === 'update an employee role') {
            const updateEmployee = await inquirer.prompt({
                type: 'list',
                   name: 'employee',
                   message: 'Please select the employee you would like to update',
                   choices: ['Rick Smith', 'Bob Johnson', 'Mike Chan', 'Kevin Tupik']
            })
            if (updateEmployee.employee === 'Rick Smith') {
                updateEmployee.first = 'Rick'
                const updateRole = await inquirer.prompt({
                    type: 'list',
                    name: 'updateRole',
                    message: 'Please select the new role of this employee',
                    choices: ["Sales", "Finance", "Engineering", "Legal"]
                })
                if (updateRole.updateRole === 'Sales') {
                    console.log("Test")
                    updateEmployee.updateRole = 1
                }
                if (updateRole.updateRole === 'Finance') {
                    console.log("Test2")
                    updateEmployee.updateRole = 2
                }
                if (updateRole.updateRole === 'Engineering') {
                    console.log("Test3")
                    updateEmployee.updateRole = 3
                }
                if (updateRole.updateRole === 'Legal') {
                    console.log("Test4")
                    updateEmployee.updateRole = 4
                }
                db.query(`UPDATE employee
                          SET role_id = "${updateEmployee.updateRole}"
                          WHERE first_name = "${updateEmployee.first}"`, (err,row) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(row)
                            }
                          })
            }
            if (updateEmployee.employee === 'Bob Johnson') {
                updateEmployee.first = 'Bob'
                const updateRole = await inquirer.prompt({
                    type: 'list',
                    name: 'updateRole',
                    message: 'Please select the new role of this employee',
                    choices: ["Sales", "Finance", "Engineering", "Legal"]
                })
                if (updateRole.updateRole === 'Sales') {
                    console.log("Test")
                    updateEmployee.updateRole = 1
                }
                if (updateRole.updateRole === 'Finance') {
                    console.log("Test2")
                    updateEmployee.updateRole = 2
                }
                if (updateRole.updateRole === 'Engineering') {
                    console.log("Test3")
                    updateEmployee.updateRole = 3
                }
                if (updateRole.updateRole === 'Legal') {
                    console.log("Test4")
                    updateEmployee.updateRole = 4
                }
                db.query(`UPDATE employee
                          SET role_id = "${updateEmployee.updateRole}"
                          WHERE first_name = "${updateEmployee.first}"`, (err,row) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(row)
                            }
                          })
            }
            if (updateEmployee.employee === 'Mike Chan') {
                updateEmployee.first = 'Mike'
                const updateRole = await inquirer.prompt({
                    type: 'list',
                    name: 'updateRole',
                    message: 'Please select the new role of this employee',
                    choices: ["Sales", "Finance", "Engineering", "Legal"]
                })
                if (updateRole.updateRole === 'Sales') {
                    console.log("Test")
                    updateEmployee.updateRole = 1
                }
                if (updateRole.updateRole === 'Finance') {
                    console.log("Test2")
                    updateEmployee.updateRole = 2
                }
                if (updateRole.updateRole === 'Engineering') {
                    console.log("Test3")
                    updateEmployee.updateRole = 3
                }
                if (updateRole.updateRole === 'Legal') {
                    console.log("Test4")
                    updateEmployee.updateRole = 4
                }
                db.query(`UPDATE employee
                          SET role_id = "${updateEmployee.updateRole}"
                          WHERE first_name = "${updateEmployee.first}"`, (err,row) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(row)
                            }
                          })
            }
            if (updateEmployee.employee === 'Kevin Tupik') {
                updateEmployee.first = 'Kevin'
                const updateRole = await inquirer.prompt({
                    type: 'list',
                    name: 'updateRole',
                    message: 'Please select the new role of this employee',
                    choices: ["Sales", "Finance", "Engineering", "Legal"]
                })
                if (updateRole.updateRole === 'Sales') {
                    console.log("Test")
                    updateEmployee.updateRole = 1
                }
                if (updateRole.updateRole === 'Finance') {
                    console.log("Test2")
                    updateEmployee.updateRole = 2
                }
                if (updateRole.updateRole === 'Engineering') {
                    console.log("Test3")
                    updateEmployee.updateRole = 3
                }
                if (updateRole.updateRole === 'Legal') {
                    console.log("Test4")
                    updateEmployee.updateRole = 4
                }
                db.query(`UPDATE employee
                          SET role_id = "${updateEmployee.updateRole}"
                          WHERE first_name = "${updateEmployee.first}"`, (err,row) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log(row)
                            }
                    })
            }
    }
}

main();
