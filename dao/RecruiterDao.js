let pool = require('./connection.js');

class RecruiterDao{
    static async authenticate(data){
        let authQuery = "SELECT * FROM RECRUITER WHERE EMAIL=$1 AND PASSWORD=$2";
        let params = [data.email, data.password];
        try{
            let client = await pool.connect();
            let result = await client.query(authQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = RecruiterDao;