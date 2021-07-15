let RecruiterService = require('../service/RecruiterService.js');
let AuthToken = require('../middleware/AuthToken.js');

class RecruiterController{
    static async authenticate(req, res){
        let result = await RecruiterService.authenticate(req.body);
        if(result.length > 0){
            delete result[0].password;
            let token = AuthToken.generateToken(result[0]);
            result[0].token = token;
            res.status(200).json(result[0]);
        } else{
            res.status(400).json({errorMessage: "Invalid Credentials"});
        }
    }
}

module.exports = RecruiterController;