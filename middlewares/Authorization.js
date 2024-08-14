export const authorize = (requiredPermissions) => {
    return (req, res, next) => {
        const user = req.user;

        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        const hasPermission = requiredPermissions.every(permission => user.permissions[permission]);
        if (!hasPermission) return res.status(403).json({ message: 'Forbidden' });

        next();
    };
};


