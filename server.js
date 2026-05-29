const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/admission", async (req, res) => {
  try {
    const {
      parent,
      student,
      class: className,
      phone,
      message
    } = req.body;

    await pool.query(
      `INSERT INTO admissions
      (parent_name, student_name, class_name, phone, message)
      VALUES ($1, $2, $3, $4, $5)`,
      [parent, student, className, phone, message]
    );

    res.json({
      success: true,
      message: "Admission Saved"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.get("/api/admissions", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM admissions ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }
});

app.delete("/api/admissions/:id", async (req, res) => {
  try {

    const id = req.params.id;

    await pool.query(
      "DELETE FROM admissions WHERE id = $1",
      [id]
    );

    res.json({
      success: true
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }
});

app.post("/api/login", async (req, res) => {
  try {

 const { email, password } = req.body;

const result = await pool.query(
  "SELECT * FROM admins WHERE email = $1 AND password = $2",
  [email, password]
);

if (result.rows.length > 0) {

  res.json({
    success: true
  });

} else {

  res.json({
    success: false
  });

}

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });

  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});