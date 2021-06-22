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
     * Function to get an applicant profile.
     * @param {*} email 
     */
    static async findOne(email){
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

    /**
     * Function to update applicant profile to database.
     * @param {*} user 
     */
    static async update(email, data){
        const userQuery = "UPDATE APPLICANT SET NAME=$1, MOBILE=$2, YOP=$3, EXPERIENCE=$4, ADDRESS=$5 WHERE EMAIL=$6";
        let params = [data.name, data.mobile, data.yop, data.experience, data.address, email];
        try{
            let client = await pool.connect();
            let result = await client.query(userQuery, params);
            client.release();
            console.log("Profile updated")
            return result;
        } catch(err){
            throw new Error("Database error");
        }
    }
}

module.exports = ApplicantDao;