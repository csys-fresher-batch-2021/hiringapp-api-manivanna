let JobOfferService = require('../service/JobOfferService.js');

class JobController{
    /**
     * Function to get all available jobs.
     * @param {*} req 
     * @param {*} res 
     */
   static async getJobPosts(req, res){
        let result = await JobOfferService.getJobPosts();
        res.send(result);
    }
    
   /**
    * Function to get new job post from form.
    * @param {*} req 
    * @param {*} res 
    */
   static async saveJobPost(req, res){
       try{
            let status = await JobOfferService.saveJobPost(req.body);
            if(status != null){
                res.status(200).json({message: "success"});
                console.log("Job added Successfully");
            }
       } catch(err){
           res.status(400).json({errorMessage: err.message});
       }
   }
}

module.exports = JobController;