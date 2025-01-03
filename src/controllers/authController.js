const supabase = require("../config/supabase");

const authController = new (class AuthController {
    async signUp(req, res) {
        try {
            console.log("Signing up...");
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signUp({
                email,
                password
            });

            if (error) throw error;

            res.json({ "msg": "Success!" });
        } catch (error) {
            console.log("Error in signUp", error);
            res.status(400).json({ error: error.message });
        }
    }

    async signIn(req, res) {
        try {
            console.log("Signing in...");
            const { email, password } = req.body;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;
            res.json({ "msg": "Success!", "token": data.session.access_token });
        } catch (error) {
            console.log("Error in signIn:", error);
            res.status(400).json({ error: error.message });
        }
    }

})();

module.exports = authController;