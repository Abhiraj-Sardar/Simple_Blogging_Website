const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Blog").then(()=>{
    console.log("Database Successfully Connected");
}).catch((e)=>{
    console.log(e);
});

const Schema = mongoose.Schema({
    title:String,
    post1:String,
    info:String
});

const Article = mongoose.model("article",Schema);
module.exports=Article;
