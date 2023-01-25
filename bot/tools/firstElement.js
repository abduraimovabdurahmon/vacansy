const pool = require('./../database/pool');

const getFirstElement = async () => {
    try {
        const {rows} = await pool.query('SELECT * FROM employers ORDER BY user_id ASC LIMIT 1;');
        const {employerText, companyText} = require('./toText/textGenerator');

        if(rows[0]){
            return {
                info: {
                    type: 'e',
                    id: rows[0].user_id,
                },
                text: await employerText(rows[0]),
                data:{
                    name: rows[0].first_name+' '+rows[0].last_name,
                    speciality: rows[0].speciality,
                    phone: rows[0].phone,
                    email: rows[0].email,
                    telegram: rows[0].telegram,
                    location: rows[0].city+', Uzbekistan',
                }
            }
        }
        else{
            // const {rows} = await pool.query('SELECT * FROM companies ORDER BY user_id ASC LIMIT 1;');
            const {rows} = await pool.query('SELECT * FROM companies ORDER BY user_id ASC LIMIT 1;');
            if(rows[0]){
                return {
                    info: {
                        type: 'c',
                        id: rows[0].user_id,
                    },
                    text: await companyText(rows[0]),
                    data:{
                        name: rows[0].company_name,
                        phone: rows[0].phone,
                        email: rows[0].email,
                        telegram: rows[0].telegram,
                        location: rows[0].city+', Uzbekistan',
                    }
                }
            }
            else{
                return false;   
            }
        }
        
    } catch (error) {
        console.log(error)
    }
};

const deleteFirstElement = async (data) => {
    try {
        if(data.info.type === 'e'){
            await pool.query('DELETE FROM employers WHERE user_id = $1', [data.info.id])
            .then(() => {
                    return true;
            })
            .catch((err) => {
                console.log(err)
                return false;
            })
        }
        else if(data.info.type === 'c'){
            await pool.query('DELETE FROM companies WHERE user_id = $1', [data.info.id])
            .then(() => {
                    return true;
            })
            .catch((err) => {
                console.log(err)
                return false;
            })
        }

    } catch (error) {
        console.log(error)
    }
};


module.exports = {getFirstElement, deleteFirstElement};