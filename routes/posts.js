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
     Post.find({}).lean().populate({path: "categories", model: Category}).populate({path: "author", model: User}).sort({$natural:-1}).lean().then(posts => {
       res.render("site/post", { post: post.toJSON(), categories: categories, posts:posts });
     })
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

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/search", (req, res) => {
  if (req.query.look) {
    const regex = new RegExp(escapeRegex(req.query.look), 'gi');
    Post.find({}).lean().populate({path: "author", model: User}).sort({$natural:-1}).lean().then(posts => {
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
        res.render("site/blog", {posts: posts, categories: categories})
      })
    })
  }
})


module.exports = router