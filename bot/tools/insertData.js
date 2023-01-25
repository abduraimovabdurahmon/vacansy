const pool = require('./../database/pool');

const insertData = async (ctx) => {
    try {
        // insert access to database
        const res = await pool.query(`SELECT * FROM access WHERE user_id = $1`, [ctx.from.id])

        if (res.rowCount == 0) {
            await pool.query(`INSERT INTO access (user_id) VALUES ($1)`, [ctx.from.id])
        }

    } catch (error) {
        console.log(error)
    }
}



module.exports = insertData;