const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            msg: 'No token, authorization denied'
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: payload.id,
            role: payload.role
        };
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        })
    }
}

module.exports = auth;