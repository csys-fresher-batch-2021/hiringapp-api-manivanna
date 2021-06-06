let SelectedListDao = require('../dao/SelectedListDao.js');
let ApplicationService = require('./ApplicationService.js');
class SelectedListService{
    /**
     * Function to add new application to selectedlist.
     * @param {*} application 
     */
    static async addSelectedList(id){
        let application = await ApplicationService.getApplicationById(id);
        if(application != null){
            return SelectedListDao.save(application);
        } else{
            console.log("No record found");
        }
    }
}

module.exports = SelectedListService;