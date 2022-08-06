const express = require("express")
const router = express.Router()
let Post = require("../models/Post");

router.get("/", (req, res) => {
    console.log(req.session)
    res.render('site/index');
})

// router.get("/admin", (req, res) => {
//     res.render('admin/index');
// })

router.get('/blog', (req, res) => {
    Post.find({}).then(posts => {
      res.render('site/blog', {
        posts:posts.map(item => item.toJSON())
      });
    });
  });

router.get("/contact", (req, res) => {
    res.render('site/contact');
})

// router.get("/users/login", (req, res) => {
//     res.render('site/login');
// })

// router.get("/register", (req, res) => {
//     res.render('site/register');
// })

module.exports = router