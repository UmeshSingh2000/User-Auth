const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    let token;
    let authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, 'jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "User is not authorized" });
            }
            req.user = decoded
            next();
        });
    } else {
        return res.status(401).json({ message: "Token is missing, authorization denied" });
    }
}
module.exports = authMiddleware;