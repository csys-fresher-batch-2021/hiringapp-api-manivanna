let SelectedListDao = require('../dao/SelectedListDao.js');
let ApplicationService = require('./ApplicationService.js');
class SelectedListService{
    /**
     * Function to get all selected applications.
     * @param {*} application 
     */
    static getSelectedList(){
        return SelectedListDao.getAll();
    }
    
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

    /**
     * Function to update score for selected list.
     * @param {*} id 
     * @param {*} score 
     */
    static updateScore(id, score){
        return SelectedListDao.update(id, score);
    }

    /**
     * Function to get selection progress report
     */
    static getStatus(){
        return SelectedListDao.getStatus();
    }
}

module.exports = SelectedListService;