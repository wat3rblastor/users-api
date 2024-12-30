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

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users ORDER BY id ASC;"
        );
        res.json(result.rows);
    } 
    catch (err) {
        console.log("GET users error:", err);
        res.status(500).json({ "msg": "Failed to fetch users" });
    }

});

app.post("/users", async (req, res) => {
  try {
    const { first_name, last_name, email, date_of_birth } = req.body;
    const result = await pool.query(
      "INSERT INTO users(first_name, last_name, email, date_of_birth) VALUES ($1, $2, $3, $4);",
      [first_name, last_name, email, date_of_birth]
    );
    res.json({ "msg": "Success!" })
  }
  catch (err) {
    console.log("POST users error:", err);
    res.status(500).json({ "msg": "Failed to create new user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const isInDB = await pool.query(
      "SELECT * FROM users WHERE id = $1;",
      [user_id]
    );

    if (isInDB.rows.length === 0) {
      res.status(400).json({"msg": "User does not exist"});
      return;
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1;",
      [user_id]
    );
    res.json({ "msg": "Success!" });
  }
  catch (err) {
    console.log("DELETE error:", err);
    res.status(500).json({ "msg": "Failed to delete user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user_id = req.params.id;
    const { first_name, last_name, email, date_of_birth } = req.body;
    const isInDB = await pool.query(
      "SELECT * FROM users WHERE id = $1;",
      [user_id]
    );

    if (isInDB.rows.length === 0) {
      res.status(400).json({"msg": "User does not exist"});
      return;
    }

    const result = await pool.query(
      `
       UPDATE users
       SET first_name=$1, last_name=$2, email=$3, date_of_birth=$4
       WHERE id=$5 
      `,
      [first_name, last_name, email, date_of_birth, user_id]
    )
    res.json({ "msg": "Success!" });

  } 
  catch (err) {
    console.log("PUT error:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
