function authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.sendStatus(403); // Forbidden
      }
      next();
    };
  }
module.exports =  authorizeRoles;