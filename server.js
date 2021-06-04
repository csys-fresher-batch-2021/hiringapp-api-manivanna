const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

require("dotenv").config();

const port = process.env.PORT;
const app = express();

const JobController = require('./controller/JobController.js');
const ApplicantController = require('./controller/ApplicantController.js');

//body-parser configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Job post routes
app.get('/api/jobs', JobController.getJobPosts);
app.post('/api/jobs', JobController.saveJobPost);
app.put('/api/jobs/:id', JobController.updateJobPost);
app.delete('/api/jobs/:id', JobController.deleteJobPost);
app.get('/api/jobs/:id', JobController.getJobById);

//Applicant Routes
app.post('/api/user/signup', ApplicantController.addNewUser);

app.listen(port, () => console.log(`Hiring app listening on port ${port}!`))