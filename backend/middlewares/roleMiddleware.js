const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                err : `Role (${req.user.role}) is not allowed to access this resource`
            })
        }
        next();
    }
}
module.exports = authorizeRoles;