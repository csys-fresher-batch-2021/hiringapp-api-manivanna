let ApplicationDao = require('../dao/ApplicationDao.js');
let JobService = require('./JobService.js');
let InputValidator = require('../validator/InputValidator.js');

class ApplicationService{
    /**
     * Function to get all applications.
     */
    static getApplications(){
        return ApplicationDao.getApplications();
    }
    
    /**
     * Function to save new application.
     * @param {*} jobId
     * @param {*} application 
     */
    static async saveApplication(jobId, application){
        let jobDetails = await JobService.getJobById(jobId);

        let isInValidName = InputValidator.checkEmptyData(application.name);
        let isInValidEmail = InputValidator.checkEmptyData(application.email);
        let isInValidMobile = InputValidator.checkEmptyData(application.mobile);
        let isInValidYop = InputValidator.checkEmptyData(application.yop);
        let isInValidExperience = InputValidator.checkEmptyData(application.experience);
        let isInValidAddress = InputValidator.checkEmptyData(application.address);

        if(isInValidName){
            throw new Error("Invalid Name");
        } else if(isInValidEmail){
            throw new Error("Invalid Email");
        } else if(isInValidMobile){
            throw new Error("Invalid Mobile number");
        } else if(isInValidYop){
            throw new Error("Invalid Year of Passing");
        } else if(isInValidExperience){
            throw new Error("Invalid Experience");
        } else if(isInValidAddress){
            throw new Error("Invalid Address");
        }

        if(jobDetails != null){
            return ApplicationDao.save(jobDetails, application);
        } else{
            console.log("Error job details not available.");
        }
    }

    /**
     * Function to get all applications applied by an applicant using email.
     * @param {*} email 
     */
    static getApplicationsByEmail(email){
        return ApplicationDao.getApplicationsByEmail(email);
    }
}

module.exports = ApplicationService;