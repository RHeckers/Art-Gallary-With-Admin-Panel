const express = require('express');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');

const router = express.Router();


router.post("/signup", (req, res, next) => {
    const hashedPassword = passwordHash.generate(req.body.password);
    const user = new User({
        email: req.body.email,
        password: hashedPassword
    });
    user.save().then(result => {
        res.status(201).json({
            msg: 'User created',
            result: result
        })
        
    })
    .catch(err => res.status(500).json(err));;
    
});

router.post("/signin", (req, res, next) => {
    let fetchedUser;
    User.find({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({msg: "Auth Failed, no user found"});
            }
            fetchedUser = user;
            return passwordHash.verify(req.body.password, user[0].password)
        })
        .then(result => { 
            if(!result){
                return res.status(401).json({msg: "Auth Failed, passwords do not match"});
            }

            const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 
                "this is just some long string to hash the token",
                {expiresIn: '1h'});
            
            console.log(token);
            res.status(200).json({token: token});
        })
        .catch(err => res.status(500).json({msg: 'Something went wrong!', err: err}));
});

router.get('/',(req, res, next) => {
    User.find()
      .then(collections => {
          res.status(200).json(collections);
      });
});

router.get('/tokenstatus', checkAuth, (req, res, next) => {
    res.status(200).json(true);
});


module.exports = router;