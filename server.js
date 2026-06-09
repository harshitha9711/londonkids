require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const cloudinary = require("./cloudinary");
const multer = require("multer");


const app = express();

app.use(cors());
app.use(express.json());
const upload = multer({
  storage: multer.memoryStorage()
});
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
      age,
      class: className,
      phone,
      message
    } = req.body;

    await pool.query(
      `INSERT INTO admissions
(parent_name, student_name, age, class_name, phone, message)
VALUES ($1, $2, $3, $4, $5, $6)`,
      [parent, student, age, className, phone, message]
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

app.delete(
"/api/admissions/:id",
verifyAdmin,
async (req,res)=>{
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
    success: true,
    token: process.env.ADMIN_TOKEN
  });

}

else {

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

app.post(
"/api/gallery",
verifyAdmin,
upload.single("image"),
  async (req, res) => {

    try {

      const base64 =
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const result =
        await cloudinary.uploader.upload(base64, {
          folder: "londonkids"
        });

      await pool.query(
        "INSERT INTO gallery(image_url) VALUES($1)",
        [result.secure_url]
      );

      res.json({
        success: true,
        image: result.secure_url
      });

    } catch(err){

      console.error(err);

      res.status(500).json({
        success:false,
        error:err.message
      });

    }

  }
);

app.get("/api/gallery", async (req,res)=>{

  try{

    const result =
      await pool.query(
        "SELECT * FROM gallery ORDER BY id DESC"
      );

    res.json(result.rows);

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

});

app.delete(
"/api/gallery/:id",
verifyAdmin,
async (req,res)=>{

  try{

    await pool.query(
      "DELETE FROM gallery WHERE id=$1",
      [req.params.id]
    );

    res.json({
      success:true
    });

  }catch(err){

    res.status(500).json({
      error:err.message
    });

  }

});

function verifyAdmin(
req,
res,
next
){

const token =
req.headers.authorization;

if(
token !== process.env.ADMIN_TOKEN
){

return res.status(401).json({
success:false
});

}

next();

}

app.listen(5000, () => {
  console.log("Server running on port 5000");
});