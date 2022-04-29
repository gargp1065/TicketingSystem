const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');
const jwt_decode = require('jwt-decode');
const Project = require('../../models/project');
const mongoose = require('mongoose')
const { countDocuments } = require('../../models/user');
require('../../passport')(passport)
const logger = require('../../logger')





//test api endpoint
router.get('/test', (req, res, next) => res.json({msg: "It works"}));



//different endpoints 
// list of projects
// details of project
// create a project 
// delete a project
// update a project

//authorized user 

//get all projects

router.get('/getAll', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    Project.find()
    .then((projects) => {
        // console.log(projects);
        logger.info(`All projects`);
        res.json(projects);
    })
    .catch(err => console.log(err));
});


//create a project
router.post('/createProject', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.authorization;
    //has the details of the jwt payload
    const decoded = jwt_decode(token);
    // console.log(decoded);
    const newProject = new Project({
        name: req.body.name,
        description: req.body.description,
        creator: decoded.id
    });
    newProject.save()
    .then((project) => {
        logger.info("New project created");
        res.json(project)
    }).catch(err => console.log(err));
});

router.get('/detailProject/:projectId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var projectId = req.params.projectId;
    console.log(projectId)
    Project.findById(projectId)
    .then((project) => {
        console.log(project)
        logger.info("Details of a project")
        return res.status(200).json({project: project});
    })
    .catch(err => console.log(err));
    
});


//delete a project
router.delete('/deleteProject/:projectId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var projectId = req.params.projectId;

    Project.findByIdAndDelete(projectId)
    .then((project) => {
        logger.info("Project deleted");
        res.status(200).json({msg: "Project deleted"});
    })
    .catch(err => console.log(err));
})


//updating a project
router.put('/updateProject/:projectId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    
    var name =  req.body.name;
    var description = req.body.description;
    var projectId = req.params.projectId;
    const token = req.headers.authorization;
    console.log(projectId);
    //has the details of the jwt payload
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    // console.log(userId);
    Project.findById(projectId)
    .then((project) => {
        // console.log(project.creator);
        // console.log(userId);
        if(project.creator != userId)
            return res.status(400).json({msg: "This user didn't create this project"});
        else {
            Project.findByIdAndUpdate(projectId, { $set: {name, description } })
            .then((project) => {
                logger.info("Project details updated");
                return res.status(200).json({msg: "The details have been updated"});
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
});



module.exports = router;