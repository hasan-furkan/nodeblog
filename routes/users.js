const express = require("express")
const router = express.Router()
const User = require("../models/User")

router.get("/register", (req, res) => {
    res.render('site/register');
})

router.post("/register", (req, res) => {
    User.create(req.body, (err, user) => {
        res.redirect("/")
        console.log(err, user)
    })
})

router.get("/login", (req, res) => {
    res.render('site/login');
})
router.post("/login", (req, res) => {
    const {email, password} = req.body

    User.findOne({email}, (err, user) => {
        if(user){
            if(user.password == password){
                // USER SESSION
                res.redirect("/")
            }else{
                res.redirect("/users/login")
            }
        }else {
            res.redirect("/users/register")
        }
    })
})

module.exports = router