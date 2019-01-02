//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const date = require(__dirname+"/date.js");
const items = ["Buy Food", "Eat Food", "Cook Food"];
const workItems = [];

// console.log(date());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function(req, res) {

  const day = date.getDate();
  res.render("list", {
    listTitle: day,
    newItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.todoListItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newItems: workItems
  });
});

app.post("/work", function(req, res) {
  const item = req.body.todoListItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about",function(req, res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("Started hosting at port 3000");
});
