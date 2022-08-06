const express = require("express")
const router = express.Router()
const Category = require("../../models/Category")

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


module.exports = router