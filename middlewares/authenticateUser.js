const jwt = require('jsonwebtoken');

module.exports=(req, res, next)=>{
        // console.log('hit /authenticate route');
        console.log('token received:', req.headers.authorization);
        try {
            const verifiedUser = jwt.verify(req.headers.authorization, 'shhhh do not tell any one')
            verifiedUser.message="Authentication success";
            verifiedUser.valid=true;
            console.log('=====verifiedUser====>', verifiedUser);
            // res.status(201).json({message:'Authentication success',valid:true, user:verifiedUser.user})
            req.verifiedUser=verifiedUser;
            next();
        } catch (error) {
            console.log('===authenticate error ===>', error);
            res.status(401).json({message:error,valid:false})
        }


}