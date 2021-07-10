const Pool = require("pg").Pool
const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    post: 5432,
    database: "node_postgres"
});

module.exports = pool;