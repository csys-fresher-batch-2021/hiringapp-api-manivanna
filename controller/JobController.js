let JobOfferService = require('../service/JobOfferService.js');

class JobController{
   /**
    * Function to get new job post from form.
    * @param {*} req 
    * @param {*} res 
    */
   static async saveJobPost(req, res){
       await JobOfferService.saveJobPost(req.body);
   }
}

module.exports = JobController;