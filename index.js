const inquirer = require('inquirer');
const mysql2 = require('mysql2');



const db = mysql2.createConnection(
    {
        host: 'localhost',
        user: "root",
        password: 'Gococks17$',
        database: 'tracker'
    },
    console.log('Connected to the tracker database')
)


// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err)
//     }
// })

// db = util.promisify(db.query)

// const main = async () => {
//     const viewAllDept = await inquirer.prompt()
//     if (viewAllDept) {
//         db.query()
//         main()
//     }
//     const answers2 = await inquirer.prompt()
//     const result = await db.query()
// }

module.exports = db