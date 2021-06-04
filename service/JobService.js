let JobDao = require('../dao/JobDao.js');
let InputValidator = require('../validator/InputValidator.js');

class JobService{
     /**
     * Function to get all available jobs.
     */
    static getJobPosts(){
        return JobDao.getJobPosts();
    }
    
    /**
     * Function to send a new job post to dao.
     * @param {*} job 
     */
    static saveJobPost(job){
        let isFormFilled = InputValidator.checkFormFields(job);     //validate all form fields are field.
        let isValidSalary = InputValidator.validateSalary(job.minsalary, job.maxsalary);    //validate minsalary is less than maxsalary.
        let isValidExperience = InputValidator.validateExperience(job.minyears, job.maxyears);  //validate minExp is less than maxExp.

        if(!isFormFilled){
            throw new Error("All fields are not filled");
        } else if(!isValidSalary){
            throw new Error("Invalid Salary");
        } else if(!isValidExperience){
            throw new Error("Invalid Experience");
        }          
        return JobDao.save(job);
    }

    /**
     * Function to send updated job details to dao. 
     * @param {*} id 
     * @param {*} updatedData 
     */
    static updateJobPost(id, updatedData){
        return JobDao.update(id, updatedData);
    }

    /**
     * Function to delete a job post.
     * @param {*} id 
     */
    static deleteJobPost(id){
        return JobDao.delete(id);
    }
}

module.exports = JobService;