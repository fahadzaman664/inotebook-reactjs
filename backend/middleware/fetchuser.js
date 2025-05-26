var jwt = require('jsonwebtoken');
const JWT_SECRET = 'fahadisagoodb$oy';

const fetchuser = (req, res, next) => {
    //Get the user from jwt token and add id to req object 
    // below token header we will sending auth-token from header in thunder
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please send a valid auth token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }
    catch (error) {
       return res.status(401).send({ error: "Please send a valid auth token" });
    }
}


    module.exports = fetchuser;