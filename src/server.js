const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const { pool } = require("./config");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to your Express server" });
});

app.get("/api/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id ASC;"
        );
        res.json(result.rows);
    } 
    catch (err) {
        console.log("Query error:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }

});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
