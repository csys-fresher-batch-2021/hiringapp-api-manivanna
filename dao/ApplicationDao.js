let pool = require('./connection.js');

class ApplicationDao{
    /**
     * Function to retrieve all applications from database.
     */
    static async getApplications(){
        let appQuery = 'SELECT * FROM APPLICATIONS';
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
            client.release();
            return result;
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to retrieve an application from database by application id.
     */
    static async getApplicationById(id){
        let appQuery = 'SELECT * FROM APPLICATIONS WHERE ID=$1';
        let params = [id];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            client.release();
            return result.rows[0];
        } catch(err){
            console.log(err);
        }
    }

    /**
     * Function to update an application score, status, comments.
     * @param {*} application 
     */
    static async update(id, application){
        let appQuery = `UPDATE APPLICATIONS SET SCORE=$1, STATUS=$2, COMMENTS=$3 WHERE ID=$4`;
        let params = [application.score, application.status, application.comments, id];
        try{
            let client = await pool.connect();
            let result = await client.query(appQuery, params);
            console.log("Application updated successfully");
            client.release();
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
            client.release();
            return result.rows;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = ApplicationDao;