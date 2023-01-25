const pool = require('./../database/pool');


const checkAccess = async (ctx)=>{
    try {
        const res = await pool.query('SELECT * FROM access WHERE user_id = $1', [ctx.from.id])

        if(res.rows[0].access){
            return true;
        }

        return false;

    } catch (error) {
        console.log(error)
    }
}

module.exports = checkAccess;