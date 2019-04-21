const jwt = require('jsonwebtoken');

module.exports=(req, res, next)=>{
        console.log('hit /authenticate route');
        console.log('token received:', req.headers.authorization);
        try {
            const verifiedUser = jwt.verify(req.headers.authorization, 'shhhh do not tell any one')
            res.status(201).json({message:'Authentication success',valid:true, user:verifiedUser.user})
        } catch (error) {
            res.status(401).json({message:error,valid:false})
        }

        next();

}