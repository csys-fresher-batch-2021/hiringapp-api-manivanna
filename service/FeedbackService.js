let FeedbackDao = require('../dao/FeedbackDao.js');

class FeedbackService{
    static submitFeedback(feedback){
        return FeedbackDao.save(feedback);
    }

    static getAllFeedback(){
        return FeedbackDao.findAll();
    }
}

module.exports = FeedbackService;