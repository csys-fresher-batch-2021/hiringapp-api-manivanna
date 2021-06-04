let ApplicantDao = require('../dao/ApplicantDao.js');
let InputValidator = require('../validator/InputValidator.js');

class ApplicantService{
    /**
     * Function to add new applicant.
     * @param {*} name 
     * @param {*} email 
     * @param {*} password 
     */
    static async addNewApplicant(applicant){
        let name = applicant.name;
        let email = applicant.email;
        let password = applicant.password;
        let result = await ApplicantDao.checkEmailExists(email);
        if(result.length == 0){
            return ApplicantDao.save(name, email, password);
        } else{
            throw new Error("Email address already in use");
        }
    }
}

module.exports = ApplicantService;