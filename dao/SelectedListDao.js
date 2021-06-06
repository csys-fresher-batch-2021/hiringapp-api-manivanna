let pool = require('./connection.js');
class SelectedListDao{
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
            return result;
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
            return result;
        } catch(err){
            console.log(err);
        }
    }
}
module.exports = SelectedListDao;