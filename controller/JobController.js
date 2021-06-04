let JobService = require('../service/JobService.js');

class JobController{
    /**
     * Function to get all available jobs.
     * @param {*} req 
     * @param {*} res 
     */
   static async getJobPosts(req, res){
        let result = await JobService.getJobPosts();
        res.send(result);
    }
    
   /**
    * Function to get new job post from form.
    * @param {*} req 
    * @param {*} res 
    */
   static async saveJobPost(req, res){
       try{
            let status = await JobService.saveJobPost(req.body);
            if(status != null){
                res.status(200).json({message: "success"});
            }
       } catch(err){
           res.status(400).json({errorMessage: err.message});
       }
   }

    /**
    * Function to get job details by id.
    * @param {*} req 
    * @param {*} res 
    */
    static async getJobById(req, res){
        let id = req.params.id;
        let result = await JobService.getJobById(id); 
        res.send(result);
    }

   /**
    * Function to get updated job detail from form.
    * @param {*} req 
    * @param {*} res 
    */
    static async updateJobPost(req, res){
        let id = req.params.id;
        let result = await JobService.updateJobPost(id, req.body);
        if(result != null){
             res.status(200).json({message: "success"});
         } else{
             res.status(400).json({message: "failed"});
         }
    }

     /**
    * Function to get job id from url to delete a job.
    * @param {*} req 
    * @param {*} res 
    */
   static async deleteJobPost(req, res){
        let id = req.params.id;
        let result = await JobService.deleteJobPost(id);
        if(result.rowCount > 0){
            res.status(200).json({message: "success"});
        } else{
            res.status(400).json({message: "failed"});
        }
    }
}

module.exports = JobController;