let pool = require('./connection.js');

class ApplicantDao{
    /**
     * Function to save new user to database.
     * @param {*} user 
     */
    static async save(name, email, password){
        const userQuery = "INSERT INTO APPLICANT (NAME, EMAIL, PASSWORD) VALUES ($1, $2, $3) RETURNING *";
        let params = [name, email, password];
        try{
            let client = await pool.connect();
            let result = await client.query(userQuery, params);
            client.release();
            return result;
        } catch(err){
            throw new Error("Database error");
        }
    }

    /**
     * Function to check whether user is available in database for authentication.
     * @param {*} user 
     */
    static async authenticateUser(email, password){
        const userQuery = "SELECT * FROM APPLICANT WHERE EMAIL=$1 AND PASSWORD=$2";
        let params = [email, password];
        try{
            let client = await pool.connect();
            let result = await client.query(userQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            throw new Error("Database error");
        }
    }

    /**
     * Function to check email already in use.
     * @param {*} email 
     */
    static async checkEmailExists(email){
        let userQuery = "SELECT * FROM APPLICANT WHERE EMAIL=$1";
        let params = [email];
        try{
            let client = await pool.connect();
            let result = await client.query(userQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            throw new Error("Database error");
        }
    }
}

module.exports = ApplicantDao;