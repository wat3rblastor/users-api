const supabase = require("../config/supabase");

async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ "msg": "No access token" });
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.log(token);
            return res.status(401).json({ "msg": "Invalid token" });
        }

        req.user = user;
        next();
    } catch(error) {
        res.status(401).json({ "msg": "Authentication failed" });
    }
}

module.exports = authMiddleware;