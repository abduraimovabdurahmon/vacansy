const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'jomiy007',
    host: 'localhost',
    port: 5432,
    database: 'vacansy'
})

module.exports = pool;