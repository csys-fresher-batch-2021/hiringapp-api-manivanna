let JobOfferDao = require('../dao/JobOfferDao.js');
let InputValidator = require('../validator/InputValidator.js');

class JobOfferService{
     /**
     * Function to get all available jobs.
     */
    static getJobPosts(){
        return JobOfferDao.getJobPosts();
    }
    
    /**
     * Function to send a new job post to dao.
     * @param {*} job 
     */
    static saveJobPost(job){
        let isFormFilled = InputValidator.checkFormFields(job);     //validate all form fields are field.
        let isValidSalary = InputValidator.validateSalary(job.minsalary, job.maxsalary);    //validate minsalary is less than maxsalary.
        let isValidExperience = InputValidator.validateExperience(job.minyears, job.maxyears);  //validate minExp is less than maxExp.

        if(isFormFilled && isValidSalary && isValidExperience){
            let newJob = [job.jobtitle, job.jobtype, job.description, job.skills, job.minyears, job.maxyears,
                job.minsalary, job.maxsalary, job.location, job.vacancy, job.qualification];    //adding all job details to an array.            
            return JobOfferDao.save(newJob);
        } else if(!isFormFilled){
            throw new Error("All fields are not filled");
        } else if(!isValidSalary){
            throw new Error("Invalid Salary");
        } else if(!isValidExperience){
            throw new Error("Invalid Experience");
        }
    }

    /**
     * Function to send updated job details to dao. 
     * @param {*} id 
     * @param {*} updatedData 
     */
    static updateJobPost(id, updatedData){
        let updatedJob = [updatedData.jobtitle, updatedData.jobtype, updatedData.description, updatedData.skills, 
            updatedData.minyears, updatedData.maxyears, updatedData.minsalary, updatedData.maxsalary, 
            updatedData.location, updatedData.vacancy, updatedData.qualification, id];  //adding updated job details and job id to array
        return JobOfferDao.update(updatedJob);
    }
}

module.exports = JobOfferService;