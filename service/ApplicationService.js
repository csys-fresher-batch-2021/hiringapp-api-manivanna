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
        let alreadyApplied = await ApplicationDao.checkApplicationDone(jobId, application.email);
        let applicationOpened = InputValidator.isValidDate(jobDetails.end_date);
        if(alreadyApplied.length > 0){
            throw new Error("Application already submitted");
        }
        if(!applicationOpened){
            throw new Error("Registration closed");
        }
        let isInValidName = InputValidator.checkEmptyData(application.name);
        let isInValidEmail = InputValidator.checkEmptyData(application.email);
        let isInValidMobile = InputValidator.checkEmptyData(application.mobile);
        let isInValidAddress = InputValidator.checkEmptyData(application.address);
        let isValidYop = InputValidator.validateYearOfPassing(application.yop);
        let isValidExperience = InputValidator.validExperienceYear(application.experience);

        if(isInValidName){
            throw new Error("Invalid Name");
        } else if(isInValidEmail){
            throw new Error("Invalid Email");
        } else if(isInValidMobile){
            throw new Error("Invalid Mobile number");
        } else if(!isValidYop){
            throw new Error("Invalid Year of Passing");
        } else if(!isValidExperience){
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
     * Function to get an application by id.
     * @param {*} id  
     */
    static async getApplicationById(id){
        return ApplicationDao.getApplicationById(id);
    }

    /**
     * Function to update an application.
     * @param {*} id 
     * @param {*} application 
     */
    static updateApplication(id, application){
        return ApplicationDao.update(id, application);
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