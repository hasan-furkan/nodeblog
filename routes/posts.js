const express = require("express")
const router = express.Router()
const Post = require("../models/Post")
const path = require("path")
const Category = require("../models/Category")
const User = require("../models/User")

router.get("/new", (req, res) => {
  if(!req.session.userId){
    return res.redirect("/users/login");
  }
  Category.find({}).lean().then(categories => {
    res.render("site/addpost", {categories:categories})
  })
})

router.get("/:id", (req, res) => {
  Post.findById(req.params.id).then((post) => {
   Category.find({}).lean().then(categories => {
     res.render("site/post", { post: post.toJSON(), categories: categories });
   })
  });
});

router.post("/test", (req, res) => {

  let post_image = req.files.post_image

  post_image.mv(path.resolve(__dirname, "../public/img/postimages", post_image.name))

    Post.create({
      ...req.body,
      post_image:`/img/postimages/${post_image.name}`,
      author: req.session.userId
    },)
  req.session.sessionFlash = {
    type: "alert alert-success",
    message: "Post başarılı bir şekilde eklendi"
  }
    res.redirect("/blog")
})


module.exports = router