const express = require('express');
const router = express.Router();
const Issue = require('../../models/issue');
const jwt_decode = require('jwt-decode');
const passport = require('passport');

const logger = require('../../logger');

// Get a list of Issues.
// g. Get details of an Issue.
// h. Create an Issue.
// i. Update an Issue.
// j. Delete an Issue.
// k. Get a list of Issues under a Project.
// l. Get details of an Issue under a Project.
// m. Create an Issue under a Project.
// n. Update an Issue under a Project.
// o. Delete an Issue under a Project.
// p. Assign an Issue to a User.
// q. Update the Status of an Issue.

//all the issues in the db
router.get('/getAll', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    Issue.find({})
    .then((issues) => {
        logger.info('All issues fetched');
        return res.status(200).json(issues);
    })
    .catch(err => console.log(err));
})

//get issues for a user
router.get('/getIssue/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    Issue.find({assignee: userId}).then((issues) => {
        if(issues.length != 0) {
            console.log(issues);
            logger.info('Issues for a user');
            return res.status(200).json(issues);
        }
        else {
            logger.info('no issue');
            return res.status(200).json({msg : "No issues"});
        }
    }).catch(err => console.log(err));
})

//get all issue for a projet 
router.get('/getProjectIssue/:projectId', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    const projId = req.params.projectId;
    Issue.find({projectId: projId}).then(issues => {
        if(issues != null) {
            logger.info('Issues for a project');
            return res.status(200).json(issues);
        }
        else {
            logger.info('no issue');
            return res.status(200).json({msg : "No issues"});
        }
    }).catch(err => console.log(err));
})

//get details of an issue
router.get('/detailIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const issueId = req.params.issueId;
    Issue.findById(issueId)
    .then((issue)=> {
        if(issue != null) {
            logger.info(`Details of issue with id ${issueId}`)
            return res.status(200).json(issue);
        }
            
        else return res.status(404).json({msg: "No issue with this id"});
    }).catch(err => console.log(err));
})

//create an issue
router.post('/createIssue', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    
    const newIssue = new Issue({
        projectId: req.body.projectId, 
        issueType: req.body.issueType,
        title: req.body.title,
        description: req.body.description,
        creator: userId,
        assignee: req.body.assignee,
        status: req.body.status
    });
    newIssue.save()
    .then((issue) => {
        logger.info('Issue created');
        res.status(200).json(issue)})
    .catch(err => alert(err));
})

//get all issues for a project
router.get('/projectIssues/:projectId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const projectId = req.params.projectId;
    Issue.find({projectId: projectId})
    .then((issues) => {
        logger.info('Issues of a particular project');
        return res.status(200).json(issues);

    }).catch(err => alert("Error in getting details"))
});

//update an issue
router.put('/updateIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const issueId = req.params.issueId;
    const status = req.body.status;
    console.log(status);
    Issue.findByIdAndUpdate(issueId, {$set : {status}})
    .then(issue => {
        if(issue != null) {
            logger.info("Issue status updated");
            return res.status(200).json({msg : "Issue status have been changed"});
        }
        else return res.status(400).json({msg: "Error in updating status" });
    })
});



//get all issues of a user
router.get('/getIssue/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.params.id;
    Issue.find({assignee: userId}).then(issue => {
        if(issue != null) {
            logger.info('Issues for a user');
            return res.status(200).json({msg : "Issues fetched"});
        }
        else return res.status(200).json({msg : "No issues"});
    }).catch(err => console.log(err));

});

//delete an issue
router.delete('/deleteIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const issueId = req.params.issueId;
    console.log(issueId);
    Issue.findByIdAndDelete(issueId)
    .then((issue)=> {
        if(issue != null) {
            logger.info("Issue deleted");
            return res.status(200).json({msg: "Issue deleted"});
        }
            
        else return res.status(400).json({msg: "Issue doesnt existed"});
    }).catch(err => console.log(err))
});


module.exports = router;