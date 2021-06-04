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
        let jobQuery = `UPDATE JOBOFFERS SET JOBTITLE=$1, JOBTYPE=$2, DESCRIPTION=$3, SKILLS=$4, MINYEARS=$5, MAXYEARS=$6, 
                        MINSALARY=$7, MAXSALARY=$8, LOCATION=$9, VACANCY=$10, QUALIFICATION=$11 WHERE ID=$12`;
        let params = [
                        updatedData.jobtitle, updatedData.jobtype, updatedData.description, updatedData.skills, 
                        updatedData.minyears, updatedData.maxyears, updatedData.minsalary, updatedData.maxsalary, 
                        updatedData.location, updatedData.vacancy, updatedData.qualification, id
                    ];
        try{
            let client = await pool.connect();
            let result = client.query(jobQuery, params);
            console.log("Job updated successfully");
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
            return result;
            console.log("Job deleted successfully");
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = JobDao;