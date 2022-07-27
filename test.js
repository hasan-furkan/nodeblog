const mongoose = require("mongoose");

const Post = require("./models/Post");

const baglan = () => {
  try {
    mongoose.connect("mongodb://127.0.0.1/nodeblog_test_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb baglandi");
  } catch (err) {
    console.log(err);
  }
};

baglan();

Post.create(
  {
    title: "Benim ilk post basligim",
    content: "Post icerigi, lorem ipsum text",
  },
  (err, post) => {
    console.log(err, post);
  }
);
