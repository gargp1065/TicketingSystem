const express = require('express');
const router = express.Router();
const Issue = require('../../models/issue');
const jwt_decode = require('jwt-decode');
const passport = require('passport');
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
        return res.status(200).json(issues);
    })
    .catch(err => console.log(err));
})

//get details of an issue
router.get('/detailIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const issueId = req.params.issueId;
    Issue.findById(issueId)
    .then((issue)=> {
        if(issue != null)
            return res.status(200).json(issue);
        else return res.status(404).json({msg: "No issue with this id"});
    }).catch(err => console.log(err));
})

//create an issue
router.post('/createIssue', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt_decode(token);
    const userId = decoded.id;
    
    const newIssue = new Issue({
        issueType: req.body.issueType,
        description: req.body.description,
        creator: userId,
        assignee: req.body.assigneeId,
        status: req.body.status
    });
    newIssue.save()
    .then((issue) => res.status(200).json(issue))
    .catch(err => console.log(err));
})

// //update an issue
// router.put('/updateIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
//     const 
// });



//delete an issue
router.delete('/deleteIssue/:issueId', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const issueId = req.params.issueId;
    Issue.findByIdAndRemove(issueId)
    .then((issue)=> {
        if(issue != null)
            return res.status(200).json({msg: "Issue deleted"});
        else return res.status(400).json({msg: "Issue doesnt existed"});
    }).catch(err => console.log(err))
});


module.exports = router;