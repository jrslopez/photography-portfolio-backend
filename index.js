const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//ROUTES

//add a photo
app.post("/upload", async (req, res) => {
  try {
    const { album_name, image_number, date, url, front } = req.body
    const newImage = await pool.query(
      "INSERT INTO images (album_name, image_number, date, url, front) VALUES ($1,$2,$3,$4, $5) RETURNING *",
      [album_name, image_number, date, url, front]
    )
    res.json(newImage)
  } catch (error) {
    console.error(error.message)
  }
})

//display photos
app.get("", async (req, res) => {
  try {
    const allImages = await pool.query("SELECT * FROM images")
    res.json(allImages.rows)
  } catch (error) {
    console.error(error.message)
  }
})

//login

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === "admin" && password === "1234") {
      console.log("login successful!")
    } else console.log("wrong user/pw")
    res.json()
  } catch (error) {
    console.error(error.message)
  }
})

app.listen(4000, () => {
  console.log("server started on port 4000!")
})
