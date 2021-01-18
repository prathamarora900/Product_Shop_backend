var jwt = require("jsonwebtoken");
const config = require("config");

module.exports.userAuth = (req, res, next) => {
    //Get Token from header

    const token = req.header("x-auth-token");

    //Check if not token

    if (!token) {
        return res.status(401).json({ msg: "No token ,authorized" });
    }

    //Verify Token
    try {
        const decoded = jwt.verify(token, config.get("jwtToken"));
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports.adminAuth = (req, res, next) => {
    //Get Token from header

    const token = req.header("x-auth-token");

    //Check if not token

    if (!token) {
        return res.status(401).json({ msg: "No token ,authorized" });
    }

    //Verify Token
    try {
        const decoded = jwt.verify(token, config.get("jwtToken"));
        if (decoded.user.role !== "admin")
            return res.status(401).json({ msg: "Not Authorized" });
        req.user = decoded.user;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};