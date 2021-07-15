const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET;

class AuthToken {
    static generateToken(user){
        let token = jwt.sign(user, TOKEN_SECRET, {expiresIn: 86400});
        return token;
    }

    static authenticateToken(req, res, next){
        let authHeader = req.headers.authorization;
        let token = authHeader.split(' ')[1];
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if(err) return res.status(401).json({errorMessage: "Unauthorized"});
            req.user = user;
            next();
        });
    }
}

module.exports = AuthToken;