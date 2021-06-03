let pool = require('./connection.js');

class JobOfferDao{
    /**
     * Function to retrieve all job posts from database.
     */
    static async getJobPosts(){
        let jobQuery = 'SELECT * FROM JOBOFFERS';
        try{
            let client = await pool.connect();
            let result = await client.query(jobQuery);
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
    
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
            let result = await client.query(jobQuery, job);
            return result;
        } catch(err){
            throw new Error("Connection failed");
        }
    }
}

module.exports = JobOfferDao;