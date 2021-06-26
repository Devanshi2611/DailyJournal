const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const homeStartingContent = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
const AboutContent = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";
const ContactContent = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 an(The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Admin-Devanshi:devu26@cluster0.hrwkb.mongodb.net/blogDB",{ useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
  title: String,
  content: String
};

const Item = mongoose.model("Item",itemSchema);

let items = [];

app.get("/", function(req, res) {
  res.render("home", {
    starting: homeStartingContent,
    items: items,
  });

});


app.get("/about", function(req, res) {
  res.render("about", {
    second: AboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    third: ContactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const item = new Item ({
    title: req.body.postTitle,
    content: req.body.PostBody
  });

  items.push(item);
  item.save();
  res.redirect("/");
});

app.get("/items/:itemId", function(req, res) {

const requestedItemId = req.params.itemId;


Item.findOne({_id: requestedItemId}, function(err, item){
  res.render("item", {
    title: item.title,
    content: item.content

  });
});
});

app.listen(3001, function() {
  console.log("port 3001 has been started");
});
