let pool = require('./connection.js');

class JobDao{
    /**
     * Function to retrieve all job posts from database.
     */
    static async getJobPosts(){
        let jobQuery = 'SELECT * FROM JOBOFFERS';
        try{
            let client = await pool.connect();
            let result = await client.query(jobQuery);
            client.release();
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
        let params = [
                        job.jobtitle, job.jobtype, job.description, job.skills, job.minyears, job.maxyears,
                        job.minsalary, job.maxsalary, job.location, job.vacancy, job.qualification
                    ];
        try{
            let client = await pool.connect();
            let result = await client.query(jobQuery, params);
            console.log("Job added successfully");
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to get a job details by using id.
     * @param {*} id 
     */
    static async getJobById(id){
        let jobQuery = `SELECT * FROM JOBOFFERS WHERE ID=$1`;
        let params = [id];
        try{
            let client = await pool.connect();
            let result = await client.query(jobQuery, params);
            client.release();
            return result.rows[0];
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to a update job post in database using job id.
     * @param {*} updatedJob 
     */
    static async update(id, updatedData){
        let jobQuery = `UPDATE JOBOFFERS SET JOBTYPE=$1, DESCRIPTION=$2, SKILLS=$3, MINYEARS=$4, MAXYEARS=$5, 
                        MINSALARY=$6, MAXSALARY=$7, VACANCY=$8, QUALIFICATION=$9 WHERE ID=$10`;
        let params = [
                        updatedData.jobtype, updatedData.description, updatedData.skills, 
                        updatedData.minyears, updatedData.maxyears, updatedData.minsalary, 
                        updatedData.maxsalary, updatedData.vacancy, updatedData.qualification, id
                    ];
        try{
            let client = await pool.connect();
            let result = client.query(jobQuery, params);
            console.log("Job updated successfully");
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to delete a job post
     * @param {*} id 
     */
    static async delete(id){
        let jobQuery = `DELETE FROM JOBOFFERS WHERE ID=$1`;
        let params = [id];
        try{
            let client = await pool.connect();
            let result = client.query(jobQuery, params);
            console.log("Job deleted successfully");
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to check job with same location already posted.
     * @param {*} jobtitle 
     * @param {*} location 
     */
    static async checkJobExists(jobtitle, location){
        let jobQuery = `SELECT * FROM JOBOFFERS WHERE LOWER(JOBTITLE)=LOWER($1) AND LOWER(LOCATION)=LOWER($2)`;
        let params = [jobtitle, location];
        try{
            let client = await pool.connect();
            let result = await client.query(jobQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = JobDao;