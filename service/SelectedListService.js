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

    /**
     * Function to delete an application from selectedlist.
     * @param {*} id 
     */
    static deleteSelectedList(id){
        return SelectedListDao.delete(id);
    }
}

module.exports = SelectedListService;