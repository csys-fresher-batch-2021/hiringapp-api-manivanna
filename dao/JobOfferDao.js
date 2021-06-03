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
            console.log("Job added successfully");
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to a update job post in database using job id.
     * @param {*} updatedJob 
     */
    static async update(updatedJob){
        let jobQuery = `UPDATE JOBOFFERS SET JOBTITLE=$1, JOBTYPE=$2, DESCRIPTION=$3, SKILLS=$4, MINYEARS=$5, MAXYEARS=$6, 
                        MINSALARY=$7, MAXSALARY=$8, LOCATION=$9, VACANCY=$10, QUALIFICATION=$11 WHERE ID=$12`;
        try{
            let client = await pool.connect();
            let result = client.query(jobQuery, updatedJob);
            console.log("Job updated successfully");
            return result;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = JobOfferDao;