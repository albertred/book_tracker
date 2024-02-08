// importing installed libraries  (were installed using npm)
const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // importing package

const users = []

app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

// saves info when a user registers
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