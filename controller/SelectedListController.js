let SelectedListService = require('../service/SelectedListService.js');
class SelectedListController{
    /**
     * Function to get all selected applications.
     * @param {*} application 
     */
    static async getSelectedList(req, res){
        let result = await SelectedListService.getSelectedList();
        if(result != null){
            res.status(200).json(result);
        } else{
            res.status(400).json({message: "failed"});
        }
    }

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

    /**
     * Function to delete an application from selectedlist.
     * @param {*} id 
     */
    static async deleteSelectedList(req, res){
        let id = req.params.id;
        let result = await SelectedListService.deleteSelectedList(id);
        if(result.rowCount > 0){
            res.status(200).json({message: "success"});
            console.log("Application removed from selected list");
        } else{
            res.status(400).json({message: "failed"});
        }
    }

    /**
     * Function to update selected application score.
     * @param {*} req 
     * @param {*} res 
     */
    static async updateScore(req, res){
        let id = req.params.id;
        let score = req.body.score;
        let result = await SelectedListService.updateScore(id, score);
        if(result.rowCount > 0){
            res.status(200).json({message: "success"});
            console.log("Score updated");
        } else{
            res.status(400).json({message: "failed"});
        }
    }

    /**
     * Function to get selection progress report
     */
    static async getStatus(req, res){
        let result = await SelectedListService.getStatus();
        if(result != null){
            res.status(200).json(result);
        } else{
            res.status(400).json({message: "failed"});
        }
    }
}

module.exports = SelectedListController;