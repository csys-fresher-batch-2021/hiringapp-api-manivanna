let pool = require('./connection.js');
class SelectedListDao{
    /**
     * Function to get all selected applications.
     * @param {*} application 
     */
    static async getAll(){
        let appQuery = `SELECT * FROM SELECTEDLIST`;
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to check applicant already selected.
     * @param {*} jobId 
     * @param {*} applicationId 
     */
    static async findOne(jobId, applicationId){
        let appQuery = `SELECT * FROM SELECTEDLIST WHERE JOBID=$1 AND APPLICATIONID=$2`;
        let params = [jobId, applicationId];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
    
    /**
     * Function to add new application to selectedlist table.
     * @param {*} application 
     */
    static async save(application){
        let appQuery = `INSERT INTO SELECTEDLIST(
            JOBID, APPLICATIONID, NAME, EMAIL, JOBTITLE, SCORE)
            VALUES($1, $2, $3, $4, $5, $6)`;
        let params = [
                        application.jobid, application.id, application.name, 
                        application.email, application.jobtitle, application.score
                     ];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to delete an application from selectedlist table.
     * @param {*} id 
     */
    static async delete(id){
        let appQuery = `DELETE FROM SELECTEDLIST WHERE APPLICATIONID=$1`;
        let params = [id];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to update score for selectedlist application.
     * @param {*} id 
     * @param {*} score 
     */
    static async update(id, score){
        let appQuery = `UPDATE SELECTEDLIST SET SCORE=$1 WHERE APPLICATIONID=$2`;
        let params = [score, id];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }
    
    /**
     * Function to get selection progress report.
     */
    static async getStatus(){
        let appQuery = `SELECT DISTINCT JOB.ID, JOB.JOBTITLE, JOB.VACANCY, JOB.LOCATION,
            (SELECT COUNT(*) AS SELECTED FROM SELECTEDLIST WHERE JOBID = JOB.ID) 
            FROM JOBOFFERS JOB;`;
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery);
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
}
module.exports = SelectedListDao;