const axios = require('axios');
const apiKey = Buffer.from(process.env.COUCH_USER + ":" + process.env.COUCH_PASSWORD).toString('base64');
const headers = {
    'Authorization' : `Basic ${apiKey}`
};

class FeedbackDao{
    static async save(feedback){
        const url = process.env.COUCH_URL + '/hiringapp-feedback';
        try{
            let result = await axios.post(url, feedback, {headers: headers});
            return result;
        } catch(err){
            console.log(err);
        }
    }

    static async findAll(){
        const url = process.env.COUCH_URL + '/hiringapp-feedback/_all_docs?include_docs=true';
        try{
            let result = await axios.get(url, {headers: headers});
            return result;
        } catch(err){
            console.log(err);
        }
    }
}

module.exports = FeedbackDao;