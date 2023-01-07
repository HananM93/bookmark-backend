
// DEPENDENCIES

// SEED
// const bkmkSeed = require('./seed.js')
// get .env variables
require("dotenv").config()
// pull PORT from .env, give default value of 3001
const { PORT = 3001 } = process.env
// import express
const express = require("express")
// create application object
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const morgan = require("morgan")

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL, {})

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message + " is mongo not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// MODEL
const bookmarkSchema = new mongoose.Schema({
  title: {type: String},
  url: {type: String},
})

const Bookmark = mongoose.model('bookmark', bookmarkSchema)

  // MiddleWare
  
  app.use(cors()) // prevents cross origin resource sharing errors, allows access to server from all origins i.e. react frontend
  app.use(morgan("dev")) // loggs details of all server hits to terminal 
  app.use(express.json()) // parse json bodies from request
  app.use(express.urlencoded({extended: false})); // to use URL encoded

// ROUTES IDUC

// create a test route
app.get("/", (req, res) => {
  res.send("hello world")
})

//SEED
app.get('/seed', (req, res) => {
  Bookmark.create(bkmkSeed, (err, data) => {
    res.redirect('/bookmarks')
  })
})

// INDEX - all bookmarks
app.get('/bookmarks', async (req, res) => {
  try {
    res.status(200).json (await Bookmark.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

// DELETE 
app.delete('/bookmarks/:id', async (req, res) => {
  try {
    res.status(200).json (await Bookmark.findByIdAndDelete(req.params.id))
  } catch (error) {
    res.status(400).json(error)
  }
})

// UPDATE
app.put('/bookmarks/:id', async (req, res) => {
  try {
    res.status(200).json (await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true }))
  } catch (error) {
    res.status(400).json(error)
  }

})

// CREATE
app.post('/bookmarks', async (req, res) => {
  try {
    res.status(200).json (await Bookmark.create (req.body))
  } catch (error) {
    res.status(400).json(error)
  }
})




// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))