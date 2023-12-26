const jwt = require('jsonwebtoken');
const{secret} = require('../config/authConfig');

exports.verifyToken=(req,res,next)=>{
    const token = req.header('x-auth-token');

    if(!token){
       return res.status(401).json({message:'No token,authorization denied'});
    }
    try{
        const decoded = jwt.verify(token,secret);
        
        req.user=decoded.user;
        next();


    }catch(err){
        res.status(401).json({message:'Invalid token'});
    }
}