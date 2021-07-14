let ApplicantService = require('../service/ApplicantService.js');
let AuthToken = require('../middleware/AuthToken.js');

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
            delete result[0].password;
            let token = AuthToken.generateToken(result[0]);
            result[0].token = token;
            res.status(200).json(result[0]);
        } else{
            res.status(400).json({errorMessage: "Invalid Credentials"});
        }
    }

    /**
     * Function to get an applicant profile details.
     * @param {*} req 
     * @param {*} res 
     */
    static async getProfile(req, res){
        let email = req.params.email;
        if(req.user.email === email){
            try{
                let result = await ApplicantService.getProfile(email);
                if(result != null){
                    res.status(200).json(result[0]);
                }
            } catch(err){
                res.status(400).json({errorMessage: err.message});
            }
        } else {
            res.status(401).json({errorMessage: "Unauthorized"});
        }
    }

    /**
     * Function to update an applicant profile details.
     * @param {*} req 
     * @param {*} res 
     */
    static async updateProfile(req, res){
        let email = req.params.email;
        if(req.user.email === email){
            try{
                let result = await ApplicantService.updateProfile(email, req.body);
                if(result != null){
                    res.status(200).json({message: "Success"});
                }
            } catch(err){
                res.status(400).json({errorMessage: err.message});
            }
        } else{
            res.status(401).json({errorMessage: "Unauthorized"});
        }
    }
}

module.exports = ApplicantController;