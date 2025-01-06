const jwt = require ('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message:'Unauthorized'});

    jwt.verify(token, process.env.JWT_SECRETKEY, (err,decoded)=>{
        if(err) return res.status(403).json({message:'Invalid token'});
        req.user =decoded;
        next();
    });
};

const isAdmin = (req,res,next)=>{
    if(req.user.role !== 'admin') {
        return res.status(403).json({message:'Access denied: Admins only'});
    }
    next();
};


module.exports = {verifyToken,isAdmin};