let JobOfferDao = require('../dao/JobOfferDao.js');

class JobOfferService{
    /**
     * Function to send a new job post to dao.
     * @param {*} job 
     */
    static saveJobPost(job){
        let newJob = [job.jobtitle, job.jobtype, job.description, job.skills, job.minyears, job.maxyears,
                        job.minsalary, job.maxsalary, job.location, job.vacancy, job.qualification];    //adding all job details to an array.
        JobOfferDao.save(newJob);
    }
}

module.exports = JobOfferService;