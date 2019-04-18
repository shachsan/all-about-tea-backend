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
                if(!user){
                    return res.status(401).json({
                        message:"User not found",
                        success: false,
                        error:'wrong email'
                    });
                }
                
                //below code is executed if user is found
                // verify the password
                Bcrypt.compare(req.body.password, user.password)
                    .then(result=>{
                    console.log('bcrypt compare returns===>', result);
                    if(!result){
                        return res.status(401).json({message:"Incorrect password", success: false, error:"wrong password"});
                    }
                    try{
                    const token = jwt.sign(
                        {user:{userId:user._id, username:user.username, first_name:user.first_name,
                            middle_initial:user.middle_initial,
                            last_name:user.last_name}}, 
                        'shhhh do not tell any one', 
                        {expiresIn:'1h'})

                        res.status(200).json({message: "User successfully logged in", 
                            success: true, token:token, 
                            user:{userId:user._id, username:user.username, first_name:user.first_name,
                                    middle_initial:user.middle_initial,
                                    last_name:user.last_name}});
                    }catch(error){
                        res.status(401).json({message:error, success:false});

                    }
                }).catch(err => {
                    res.status(401).json({message:err, success: false})
                })
            })
            .catch(error=>{
                console.log('error====>', error);
                res.status(401).json({
                    message:error,
                    success: false
                });
            });
});

router.post('/authenticate',(req, res)=>{
    console.log('hit /authenticate route');
    console.log('token received:', req.headers.authorization);
    try {
        const verifiedUser = jwt.verify(req.headers.authorization, 'shhhh do not tell any one')
        // console.log('jwtVerifyReturns=====>', jwtVerifyReturns);
        res.status(201).json({message:'Authentication success',valid:true, user:verifiedUser.user})
    } catch (error) {
        res.status(401).json({message:error,valid:false})
    }
});


module.exports = router;