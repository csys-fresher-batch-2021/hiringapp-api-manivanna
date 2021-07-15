let FeedbackService = require('../service/FeedbackService.js');

class FeedbackController{
    static async submitFeedback(req, res){
        let result = await FeedbackService.submitFeedback(req.body);
        if(result.data.ok == true){
            res.status(200).json({message: "Success"});
        } else{
            res.status(400).json({message: "Server error"});
        }
    }

    static async getAllFeedbacks(req, res){
        let result = await FeedbackService.getAllFeedback();
        let rows = result.data.rows.filter(obj => !obj.id.includes('_design')).map(obj => obj.doc);
        if(result != null){
            res.status(200).json(rows);
        } else{
            res.status(400).json({message: "Server error"});
        }
    }
}

module.exports = FeedbackController;