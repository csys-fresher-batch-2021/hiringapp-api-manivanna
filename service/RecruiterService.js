let RecruiterDao = require('../dao/RecruiterDao.js');

class RecruiterService{
    static async authenticate(data){
        return RecruiterDao.authenticate(data);
    }
}

module.exports = RecruiterService;