const express = require("express")
const router = express.Router()
let Post = require("../models/Post");
const Category = require("../models/Category")
const User = require("../models/User")

router.get("/", (req, res) => {
    console.log(req.session)
    res.render('site/index');
})

// router.get("/admin", (req, res) => {
//     res.render('admin/index');
// })

router.get('/blog', (req, res) => {
    Post.find({}).populate({path: "author", model: User}).sort({$natural:-1}).then(posts => {
        Category.aggregate([{$lookup: {
                from: "posts",
                localField: "_id",
                foreignField: "category",
                as: "posts"
            }},{
            $project : {
                _id : 1,
                name : 1,
                num_off_posts: {$size : "$posts"}
            }
        }]).then(categories => {
            res.render('site/blog', {
                posts:posts.map(item => item.toJSON()),
                categories:categories
            });
        })
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