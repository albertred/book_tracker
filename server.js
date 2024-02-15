// importing installed libraries  (were installed using npm)
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}


const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // importing package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session")

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    // checks if the email is in users (in our database)
    id => users.find(user => user.id === id)
    
    )


const users = []

app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // don't resave session variable if nothing is changed
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())


app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))


// configures register post functionality
app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(), // id is different for each user
            email: req.body.email,
            password: hashedPassword,
        })
        console.log(users)
        res.redirect("/login")
    } catch (e) { // error case, goes back to register
        console.log(e)
        res.redirect("/register")
    }
})

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
console.log(users)
app.listen(3000) // ?? 

// downloaded passport and passport-local and express-session; express-flash

// hash password with library called decrypt