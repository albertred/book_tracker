// importing installed libraries  (were installed using npm)
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // importing package

const users = []

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.post("")

// Routes 
app.get('/', (req, res) => {
    res.render("index.ejs") // creates template for html?
}) // routes HTTP get request with paths
// comes with the express package 

app.get('/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/register', (req, res) => {
    res.render("register.ejs")
})
// End Routes
app.listen(3000) // ?? 

// downloaded passport and passport-local and express-session; express-flash

// hash password with library called decrypt