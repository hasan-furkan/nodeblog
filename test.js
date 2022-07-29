let mongoose = require("mongoose");

let Post = require("./models/Post");

mongoose.connect("mongodb://127.0.0.1/nodeblog_test_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("mongodb baglandi");

// Post.create(
//   {
//     title: "Ikinci post basligim",
//     content: "Ikinci Post icerigi, lorem ipsum text",
//   },
//   (err, post) => {
//     console.log(err, post);
//   }
// );

Post.find({}, (err, post) =>{
  console.log(err,post);
})

// Post.findById("62e35b078bca4b2fb4ef1fdd", (err,post)=> {
//   console.log(err,post);
// })

// Post.findByIdAndUpdate("62e35c7888fd9a1654b89fbb",{
//   title: "ikinci post update oldu"
// }, (err,post)=> {
//   console.log(err,post);
// })

// Post.findByIdAndDelete("62e35c7888fd9a1654b89fbb",(err,post)=>{
//   console.log(err,post);
// })