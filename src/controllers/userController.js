const supabase = require('../config/supabase');

const userController = new (class UserController {
    async getUserProfile(req, res) { 
        try {
            console.log("Fetching all user and profile information...");

            const { data, error } = await supabase
                .from("users")
                .select(`
                    *,
                    user_profiles(*)
                `)
                .order("id", { asscending: true });

            if (error) {
                console.error("Supabase error:", error);
                throw error;
            }

            if (data) {
                console.log("Done");
                return res.json(data);
            }
        } catch (error) {
            console.log("Error in getUserProfile", error);
            res.status(400).json({ "msg": error.message })
        }
    }

    async getUser(req, res) {
        try {
            console.log("Fetching all user information...");

            const { data, error } = await supabase 
                .from("users")
                .select("*")
                .order("id", { asscending: true });

            if (error) {
                console.error("Supabase error", error);
                throw error;
            } 

            if (data) {
                console.log("Done");
                return res.json(data);
            }
        } catch (error) {
            console.log("Error in getUser:", error);
            res.status(400).json({ "msg": error.message });
        }
    }

    async createUser(req, res) {
        try {
            console.log("Creating user...");
            const { first_name, last_name, email, date_of_birth, bio } = req.body;

            const { data: newUser, error: createError } = await supabase
                .from("users")
                .insert({
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email
                })
                .select()
                .single();

            if (createError) {
                console.log("Error in createUser:", createError);
                throw createError;
            }

            const user_id = newUser.id;

            const { data: newProfile, error: profileError } = await supabase
                .from("user_profiles")
                .insert({
                   "userid": user_id,
                   "date_of_birth": date_of_birth,
                   "bio": bio 
                })
                .select()
                .single();

            if (profileError) {
                console.log("Error inserting into user_profiles:", error);
                throw profileError;
            }

            console.log("Done");
            return res.json({ "msg": "Success!" });

        } catch (error) {
            console.log("Error in createUser:", error);
            res.status(400).json({ "msg": error.message })
        }
    }

    async deleteUser(req, res) {
        try {
            const user_id = req.params.id;
            console.log("Deleting user:", user_id);

            const { data: existingUser, error: checkError } = await supabase
                .from("users")
                .select("*")
                .eq("id", user_id)
                .maybeSingle();

            if (checkError) {
                console.error("Error checking if user exists");
                throw error;
            }

            // User does not exist
            if (!existingUser) {
                console.log("User does not exist");
                throw Error("User does not exist");
            }

            const { data, error } = await supabase
                .from("users")
                .delete()
                .eq("id", user_id);

            if (error) {
                console.log("Error deleting user:", error);
                throw error;
            }

            console.log("Done");
            return res.json(({ "msg": "Success! "}))

        } catch (error) {
            console.log("Error in deleteUser:", error);
            res.status(400).json({ "msg": error.message })
        }
    }

    async updateUser(req, res) {
        try {
            const user_id = req.params.id;
            console.log("Updating user:", user_id);

            const { data: existingUser, error: checkError } = await supabase
                .from("users")
                .select("*")
                .eq("id", user_id)
                .maybeSingle();

            if (checkError) {
                console.error("Error checking if user exists");
                throw error;
            }

            console.log("Existing user data:", existingUser);

            const { first_name, last_name, email, date_of_birth, bio } = req.body;

            if (!existingUser) {
                console.log("User is not found, creating new profile");
                const { data: user, error: createError } = await supabase
                    .from("users")
                    .insert({
                        "first_name": first_name,
                        "last_name": last_name,
                        "email": email,
                    })
                    .select("*");
                
                if (createError) {
                    console.log("Error creating user", createError);
                    throw createError;
                }
            } else {
                console.log("User found, updating profile with ID:", user_id);

                const updateData = {
                    "first_name": first_name,
                    "last_name": last_name,
                    "email": email,
                };

                console.log("Update data:", updateData);

                const { data: user, error: updateError } = await supabase
                    .from("users")
                    .update(updateData)
                    .eq("id", existingUser.id)
                    .select("*");

                if (updateError) {
                    console.error("Update error:", updateError);
                    throw updateError;
                }

                if (!user || user.length === 0) {
                    console.error("No user was updated");
                    throw new Error("Failed to update user");
                }
            }
            
            const { data: newProfile, error: profileError } = await supabase
                .from("user_profiles")
                .insert({
                   "userid": user_id,
                   "date_of_birth": date_of_birth,
                   "bio": bio 
                })
                .select()
                .single();

            if (profileError) {
                console.log("Error inserting into user_profiles:", error);
                throw profileError;
            }

            console.log("Done");
            return res.json({ "msg": "Success" });

        } catch (error) {
            console.log("Error in updateUser", error);
            res.status(400).json({ "msg": error.message });
        }
    }

})();

// Export the controller instance
module.exports = userController;