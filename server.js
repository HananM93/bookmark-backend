
// DEPENDENCIES

// get .env variables
require("dotenv").config()
// pull PORT from .env, give default value of 3001
const { PORT = 3001 } = process.env
// import express
const express = require("express")
// create application object
const app = express()
const mongoose = require('mongoose')

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

// ROUTES IDUC

// create a test route
app.get("/", (req, res) => {
  res.send("hello world")
})

// INDEX - all bookmarks
app.get('/bookmarks', (req, res) => {
  res.send('These sites are bookmarked')
})

// DELETE 
app.delete('/bookmarks/:id', (req, res) => {
  
})

// UPDATE
app.put('/bookmarks/:id', (req, res) => {

})

// CREATE
app.post('/bookmarks', (req, res) => {

})




// LISTENER

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))