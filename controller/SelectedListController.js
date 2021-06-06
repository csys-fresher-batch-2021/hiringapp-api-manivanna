let SelectedListService = require('../service/SelectedListService.js');
class SelectedListController{
    /**
     * Function to add new application to selectedlist.
     * @param {*} application 
     */
    static async addSelectedList(req, res){
        let id = req.params.id;
        let result = await SelectedListService.addSelectedList(id);
        if(result != null){
            res.status(200).json({message: "success"});
            console.log("Application added to selected list");
        } else{
            res.status(400).json({message: "failed"});
        }
    }
}

module.exports = SelectedListController;