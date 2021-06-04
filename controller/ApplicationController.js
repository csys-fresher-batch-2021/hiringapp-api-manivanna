let ApplicationService = require('../service/ApplicationService.js');

class ApplicationController{
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
            res.status(400).json({message: err.message});   
        }
    }
}

module.exports = ApplicationController;