const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

require("dotenv").config();

const port = process.env.PORT;
const app = express();

let JobController = require('./controller/JobController.js');

//body-parser configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Job post routes
app.get('/openings/jobs', JobController.getJobPosts);
app.post('/openings/addjob', JobController.saveJobPost);

app.listen(port, () => console.log(`Hiring app listening on port ${port}!`))