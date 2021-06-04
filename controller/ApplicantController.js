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
    
    /**
     * Function to authenticate user.
     * @param {*} req 
     * @param {*} res 
     */
    static async authenticateUser(req, res){
        let result = await ApplicantService.authenticateUser(req.body);
        if(result.length > 0){
            result[0]['message'] = "success";
            res.status(200).json(result[0]);
        } else{
            res.status(400).json({message: "failed"});
        }
    }
}

module.exports = ApplicantController;