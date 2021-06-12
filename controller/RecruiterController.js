let RecruiterService = require('../service/RecruiterService.js');

class RecruiterController{
    static async authenticate(req, res){
        let result = await RecruiterService.authenticate(req.body);
        if(result.length > 0){
            delete result[0].password;
            result[0].message = "success";
            res.status(200).json(result[0]);
        } else{
            res.status(400).json({errorMessage: "Invalid Credentials"});
        }
    }
}

module.exports = RecruiterController;