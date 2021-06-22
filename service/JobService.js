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
    static async saveJobPost(job){
        let jobExists = await JobDao.checkJobExists(job.jobtitle, job.location);
        if(jobExists.length > 0){
            throw new Error("Job with same location already exists");
        }
        let isFormFilled = InputValidator.checkFormFields(job);     //validate all form fields are field.
        let isValidSalary = InputValidator.validateSalary(job.minsalary, job.maxsalary);    //validate minsalary is less than maxsalary.
        let isValidExperience = InputValidator.validateExperience(job.minyears, job.maxyears);  //validate minExp is less than maxExp.
        let isValidEndDate = InputValidator.isValidDate(job.end_date);
        if(!isFormFilled){
            throw new Error("All fields are not filled");
        } else if(!isValidSalary){
            throw new Error("Invalid Salary");
        } else if(!isValidExperience){
            throw new Error("Invalid Experience");
        } else if(!isValidEndDate){
            throw new Error("Invalid end date");
        }
        let today = new Date().toJSON().substr(0, 10);
        job["created_at"] = today;          
        return JobDao.save(job);
    }

    /**
     * Function to get job post details
     * @param {*} id 
     */
    static getJobById(id){
        return JobDao.getJobById(id);
    }

    /**
     * Function to send updated job details to dao. 
     * @param {*} id 
     * @param {*} updatedData 
     */
    static updateJobPost(id, updatedData){
        let isFormFilled = InputValidator.checkUpdateFields(updatedData);     //validate all form fields are field.
        let isValidSalary = InputValidator.validateSalary(updatedData.minsalary, updatedData.maxsalary);    //validate minsalary is less than maxsalary.
        let isValidExperience = InputValidator.validateExperience(updatedData.minyears, updatedData.maxyears);  //validate minExp is less than maxExp.
        let isValidEndDate = InputValidator.isValidDate(updatedData.end_date);

        if(!isFormFilled){
            throw new Error("All fields are not filled");
        } else if(!isValidSalary){
            throw new Error("Invalid Salary");
        } else if(!isValidExperience){
            throw new Error("Invalid Experience");
        } else if(!isValidEndDate){
            throw new Error("Invalid end date");
        }        
        return JobDao.update(id, updatedData);
    }

    /**
     * Function to delete a job post.
     * @param {*} id 
     */
    static deleteJobPost(id){
        return JobDao.delete(id);
    }

    /**
     * Function to archive a job post.
     * @param {*} id 
     */
    static archivePost(id){
        return JobDao.archivePost(id);
    }
}

module.exports = JobService;