let ApplicantService = require('../service/ApplicantService.js');

class ApplicantController{
    /**
     * Function to add new user to database.
     * @param {*} req 
     * @param {*} res 
     */
    static async addNewUser(req, res){
        try{
            let result = await ApplicantService.addNewApplicant(req.body);
            if(result != null){
                res.status(200).json({message: "success"});
            }
        } catch(err){
            res.status(400).json({errorMessage: err.message});
        }
    }
}

module.exports = ApplicantController;