const pool = require('./../database/pool');

const getFirstElement = async () => {
    try {
        const {rows} = await pool.query('SELECT * FROM employers ORDER BY user_id ASC LIMIT 1;');

        if(rows[0]){
            return rows[0];
        }
        else{
            return false;
        }
        
    } catch (error) {
        console.log(error)
    }
};

const deleteFirstElement = async (user_id) => {
    try {
        
       await pool.query('DELETE FROM employers WHERE user_id = $1', [user_id])
       .then(() => {
            return true;
       })
         .catch((err) => {
            console.log(err)
            return false;
        })

    } catch (error) {
        console.log(error)
    }
};


module.exports = {getFirstElement, deleteFirstElement};