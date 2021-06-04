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
            return result;
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
        let client = await pool.connect();
        let result = await client.query(userQuery, params);
        return result.rows;
    }
}

module.exports = ApplicantDao;