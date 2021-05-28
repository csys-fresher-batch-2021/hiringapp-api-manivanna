let pool = require('./connection.js');

class JobOfferDao{
    /**
     * Function to save new job to database.
     * @param {*} job 
     */
    static async save(job){
        let jobQuery = `INSERT INTO JOBOFFERS (
                            JOBTITLE, JOBTYPE, DESCRIPTION, SKILLS, MINYEARS, MAXYEARS, 
                            MINSALARY, MAXSALARY, LOCATION, VACANCY, QUALIFICATION) 
                            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
        try{
            let client = await pool.connect();
            client.query(jobQuery, job);
            console.log("Job added successfully");
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = JobOfferDao;