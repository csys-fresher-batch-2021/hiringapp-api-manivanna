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
}

module.exports = ApplicationDao;