//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({
  extended : true
}));

mongoose.connect("mongodb://localhost:27017/wikidb",{userNewurlParser:true});
const articleSchema = {
  title:String,
  content:String
};

const Article = mongoose.model("Article",articleSchema);

app.use(express.static("public"));

app.route("/articles")
.get(function(req , res){
  Article.find(function(err , foundArticle){
    if (!err) {
      res.send(foundArticle);
    }else {
      res.send(err); }
  });
})
.post(function(req ,res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  })
  newArticle.save(function(err){
    if (!err){
      res.send("Sucessfully added");
    }else {
      res.send(err);}
  });
})
.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Deleted Sucessfully!!");
    }else {
      res.send(err);}
  });
});


app.listen("3000", function() {
  console.log("Server has started at port 3000 !!");
})
