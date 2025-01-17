const jwt = require('jsonwebtoken');

const generateToken=(user)=>{
    const payload = {
        id: user._id,
        role:user.role,
    };
    return jwt.sign(
        payload, 
        process.env.JWT_SECRETKEY,
        { expiredIn:'3d' }
    );
}

module.exports= generateToken;