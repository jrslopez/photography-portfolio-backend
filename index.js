const express = require("express")
const cors = require("cors")
const app = express()
const pool = require("./db")

//MIDDLEWARE
app.use(cors())
app.use(express.json())

//ROUTES

//add a photo
app.post("", async (req, res) => {
  try {
    const { album_name, image_number, date, url } = req.body
    const newImage = await pool.query(
      "INSERT INTO images (album_name, image_number, date, url) VALUES ($1,$2,$3,$4) RETURNING *",
      [album_name, image_number, date, url]
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

app.listen(4000, () => {
  console.log("server started on port 4000!")
})
