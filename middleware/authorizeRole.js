const authorizeRole = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.userInfo || !req.userInfo.role) {
            return res.status(401).json({ message: 'Authentication required to check role.' });
        }

        if (roles.length && !roles.includes(req.userInfo.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required permissions.' });
        }

        next();
    };
};

module.exports = authorizeRole;