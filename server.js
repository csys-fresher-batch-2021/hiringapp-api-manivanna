const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

require("dotenv").config();

const port = process.env.PORT;
const app = express();

const JobController = require('./controller/JobController.js');
const ApplicantController = require('./controller/ApplicantController.js');
const ApplicationController = require('./controller/ApplicationController.js');
const SelectedListController = require('./controller/SelectedListController.js');
const RecruiterController = require('./controller/RecruiterController.js');
const FeedbackController = require('./controller/FeedbackController.js');
const AuthToken = require('./middleware/AuthToken.js');

//body-parser configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Job post routes
app.get('/api/jobs', AuthToken.authenticateToken, JobController.getJobPosts);
app.post('/api/jobs', AuthToken.authenticateToken, JobController.saveJobPost);
app.put('/api/jobs/:id', AuthToken.authenticateToken, JobController.updateJobPost);
app.delete('/api/jobs/:id', AuthToken.authenticateToken, JobController.deleteJobPost);
app.get('/api/jobs/:id', AuthToken.authenticateToken, JobController.getJobById);
app.put('/api/jobs/:id/archive', AuthToken.authenticateToken, JobController.archivePost);

//Recruiter Routes
app.post('/api/recruiter/login', RecruiterController.authenticate);
app.get('/api/applications', AuthToken.authenticateToken, ApplicationController.getApplications);
app.get("/api/applications/:id", AuthToken.authenticateToken, ApplicationController.getApplicationById);
app.patch('/api/applications/:id', AuthToken.authenticateToken, ApplicationController.updateApplication);
app.post('/api/applications/:id/select', AuthToken.authenticateToken, SelectedListController.addSelectedList);
app.delete('/api/applications/:id/deselect', AuthToken.authenticateToken, SelectedListController.deleteSelectedList);
app.get('/api/selected', AuthToken.authenticateToken, SelectedListController.getSelectedList);
app.put('/api/selected/score/:id', AuthToken.authenticateToken, SelectedListController.updateScore);
app.get('/api/dashboard', AuthToken.authenticateToken, SelectedListController.getStatus);
app.get('/api/feedback', AuthToken.authenticateToken, FeedbackController.getAllFeedbacks);

//Applicant Routes
app.post('/api/user/signup', ApplicantController.addNewUser);
app.post('/api/user/login', ApplicantController.authenticateUser);
app.get('/api/user/profile/:email', AuthToken.authenticateToken, ApplicantController.getProfile);
app.post('/api/user/profile/:email', AuthToken.authenticateToken, ApplicantController.updateProfile);
app.post('/api/user/:jobid/apply', AuthToken.authenticateToken, ApplicationController.saveApplication);
app.get('/api/user/applications/:email', AuthToken.authenticateToken, ApplicationController.getApplicationsByEmail);
app.post('/api/feedback', AuthToken.authenticateToken, FeedbackController.submitFeedback);

app.listen(port, () => console.log(`Hiring app listening on port ${port}!`));