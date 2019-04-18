const express = require('express');
const User = require('../models/user');
const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async(req, res)=>{
    try {
        const credential = req.body;
        console.log('credential received from client:', credential);
        const user = new User(credential)
    
        user.password = Bcrypt.hashSync(user.password, 10)
        console.log('credential with bycrpted password', user);
        const result = await user.save()
        res.status(201).json(result);
        
    } catch (error) {
        console.log('error:', error);
        res.status(500).send(error);
    }
})

router.post('/login', (req, res, next)=>{
    // check if the user exist with the email address
    // if user exist, verify the password provided matches with the password in the database
    // if password is authenticated, create a token for this user and send back to the user as response
        // console.log('=====req.body.email=======>',req.body);
        User.findOne({username:req.body.username})
            .then(user=>{
                // console.log('=======user========>:', user);
                if(!user){
                    // console.log('=========Wrong email =============');
                    return res.status(401).json({
                        message:"User not found",
                        success: false
                    });
                }
                
                // console.log('===========Email found, checking for password match=================');
                //below code is executed if user is found
                // verify the password
                Bcrypt.compare(req.body.password, user.password)
                    .then(result=>{
                    // console.log('result', result);
                    if(!result){
                        // console.log('=======Password did not match ==========');
                        return res.status(401).json({message:"Auth failed", success: false});
                    }
                    // console.log('==========email and password both matched=========');
                    const token = jwt.sign(
                        {username:user.username, userId:user._id}, 
                        'shhhh do not tell any one', 
                        {expiresIn:'1h'})
                    if(!token){
                        console.log('=====token creattion error=====>>>',err);
                    }
                        
                    console.log('=======token========', token);
                    res.status(200).json({message: "User successfully logged in", success: true, token:token});
                }).catch(err => {
                    res.status(401).json({message:err, success: false})
                })
            })
            .catch(error=>{
                console.log('error====>', error);
                return res.status(401).json({
                    message:error,
                    success: false
                });
            });
});

router.post('/authenticate',(req, res)=>{
    console.log('hit /authenticate route');
    console.log('token received:', req.headers.authorization);
    try {
        jwt.verify(req.headers.authorization, 'shhhh do not tell any one')
        res.status(201).json({message:'Authentication success',valid:true})
    } catch (error) {
        res.status(401).json({message:error,valid:false})
    }
});


module.exports = router;