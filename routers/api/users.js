const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const logger = require('../../logger');

const User = require('../../models/user');
const passport = require('passport');
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// require('../../passport')(passport);
//testing the application
router.get('/test', (req, res) => res.json({ msg: "It works!!" }));


router.get('/getAll', passport.authenticate('jwt', {session: false}), (req, res, next)=> {
    User.find()
    .then((users) => {
        logger.info("List of all users");
        res.json(users);
    })
    .catch(err => console.log(err));
});
//post req to register a user
router.post('/register', (req, res, next) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid) {
        logger.info("error in register");
        return res.status(400).json(errors);
    }
    //see if user already exist
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            logger.info("User already exists");
            return res.status(404).json({ email: "Email already exists"})
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        // console.log(newUser)
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    throw err;
                }
                // consolee
                newUser.password = hash;
                newUser.save()
                    .then((user) => {
                        logger.info("New user created");
                        res.json(user)
                    })
                    .catch(err => console.log(err));
            })
        })
    })
    .catch(err => console.log(err));
});


//login api endpoint

router.post('/login', (req, res, next) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid) {
        logger.info("Invalid user");
        res.statusCode = 400;
        res.json(errors);
        return; 
    }
    User.findOne({email: req.body.email})
    .then((user) => {
        if(!user) {
            logger.info("Not a user");
            return res.status(404).json({emailNotFound: "Email Not Found"})
        }
            
        //user is present in db
        bcrypt.compare(req.body.password, user.password)
        .then((isMatch) => {
            if(isMatch) {
                logger.info(`Successfull login by ${req.body.email}`);
                const payload = {
                    id: user.id, email: user.email, name: user.name
                };
                jwt.sign(payload, "secret", (err, token) => {
                    
                    res.json( { success: true, token: "Bearer " + token });
                    
                });
            }
            else {
                logger.info("Password incorrect");
                return res.status(400).json({passwordIncorrect: "Password Incorrect"});
            }
        })
        .catch(err => {console.log(err)});
    
    })
    .catch(err => {console.log(err)});
});


module.exports = router;