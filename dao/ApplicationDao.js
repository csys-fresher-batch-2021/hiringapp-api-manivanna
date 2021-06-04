let pool = require('./connection.js');

class ApplicationDao{
    /**
     * Function to save new application to database.
     * @param {*} jobDetails
     * @param {*} application 
     */
    static async save(jobDetails, application){
        let appQuery = `INSERT INTO APPLICATIONS (
                            JOBID, JOBTITLE, NAME, EMAIL, MOBILE, YOP, EXPERIENCE, ADDRESS) 
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
        let params = [
                      jobDetails.id, jobDetails.jobtitle, application.name, 
                      application.email, application.mobile, application.yop, 
                      application.experience, application.address
                     ];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            console.log("Application added successfully");
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to get all applications applied by an applicant using email.
     * @param {*} email 
     */
    static async getApplicationsByEmail(email){
        let appQuery = `SELECT * FROM APPLICATIONS WHERE EMAIL=$1`;
        let params = [email];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = ApplicationDao;