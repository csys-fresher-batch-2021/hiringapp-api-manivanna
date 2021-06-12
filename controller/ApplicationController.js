let ApplicationService = require('../service/ApplicationService.js');

class ApplicationController{
    /**
     * Function to get all applications.
     * @param {*} req 
     * @param {*} res 
     */
    static async getApplications(req, res){
        let result = await ApplicationService.getApplications();
        if(result != null){
            res.status(200).json(result);
        } else{
            res.status(400).json({errorMessage: "No data found"});
        }
    }
    
    /**
     * Function to save new application.
     * @param {*} req 
     * @param {*} res 
     */
    static async saveApplication(req, res){
        let id = req.params.jobid;
        try{
            let result = await ApplicationService.saveApplication(id, req.body);
            if(result != null){
                res.status(200).json({message: "success"});
            }
        } catch(err){
            res.status(400).json({errorMessage: err.message});   
        }
    }

    /**
     * Function to get an application by id.
     * @param {*} req 
     * @param {*} res 
     */
    static async getApplicationById(req, res){
        let id = req.params.id;
        let result = await ApplicationService.getApplicationById(id);
        if(result != null){
            res.status(200).json(result);
        } else{
            res.status(400).json({errorMessage: "Invalid application"});
        }
    }

    /**
     * Function to update an application.
     * @param {*} req 
     * @param {*} res 
     */
    static async updateApplication(req, res){
        let id = req.params.id;
        let result = await ApplicationService.updateApplication(id, req.body);
        if(result != null){
            res.status(200).json({message: "success"});
        } else{
            res.status(400).json({errorMessage: "failed"});
        }
    }

    /**
     * Function to get all applications applied by an applicant using email.
     * @param {*} email 
     */
    static async getApplicationsByEmail(req, res){
        let email = req.params.email;
        let result = await ApplicationService.getApplicationsByEmail(email);
        if(result.length > 0){
            res.status(200).json(result);
        } else{
            res.status(400).json({errorMessage: "failed"});
        }
    }
}

module.exports = ApplicationController;