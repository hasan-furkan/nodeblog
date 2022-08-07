const express = require("express")
const router = express.Router()
const Category = require("../../models/Category")
const Post = require("../../models/Post");
const User = require("../../models/User");
const path = require("path");

router.get("/", (req, res) => {
    res.render("admin/index")
})

router.get("/categories", (req, res) => {
    Category.find({}).sort({$natural:-1}).lean().then(categories => {
        res.render("admin/categories", {categories: categories})
    })
})

router.post("/categories", (req, res) => {
    Category.create(req.body, (err, category) => {
        if(!err){
            res.redirect("categories")
        }
    })
})

// DELETE CATEGORY
router.delete("/categories/:_id", (req, res) => {
    Category.deleteMany({_id : req.params._id}).then(() => {
        res.redirect("/admin/categories")
    })
})

router.get("/post", (req, res) => {
    Post.find({}).populate({path: "category", model: Category}).sort({$natural:-1}).then(posts => {
            res.render('admin/post', {
                posts:posts.map(item => item.toJSON()),
        })
    });
})

router.delete("/post/:_id", (req, res) => {
    Post.deleteMany({_id : req.params._id}).then(() => {
        res.redirect("/admin/post")
    })
})

router.get("/post/edit/:_id", (req, res) => {
  Post.findOne({_id: req.params._id}).lean().then(post => {
      console.log(post)
    Category.find({}).lean().then(categories => {
        console.log(categories)
        res.render("admin/editpost", {post: post, categories:categories})
    })
  })
})

router.put("/post/:_id", (req,res) => {
    let post_image = req.files.post_image

    post_image.mv(path.resolve(__dirname, "../../public/img/postimages", post_image.name))

    Post.findOne({_id: req.params._id}).then(post => {
        post.title = req.body.title
        post.content = req.body.content
        post.date = req.body.date
        post.category = req.body.category
        post.post_image = `/img/postimages/${post_image.name}`

        post.save().then(post => {
            res.redirect("/admin/post")
        })
    })
})


module.exports = router