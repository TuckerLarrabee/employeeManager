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

module.exports = db