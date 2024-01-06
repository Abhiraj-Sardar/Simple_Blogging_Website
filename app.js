const Article = require("./database")
const express=require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(express.urlencoded({extended:false}));

app.get("/",async(req,res)=>{
    const articles = await Article.find({});
    console.log(articles);
    res.render("index",{
        value:1,
        articles:articles
    });
})

app.get("/createPost",(req,res)=>{
    res.render("createPost");
})

app.get("/article",(req,res)=>{
    res.redirect("/");
})

app.post("/article",async(req,res)=>{
    const title = req.body.title;
    const post1 = req.body.post1;
    const info =req.body.info;
    const newArticle = new Article({title,post1,info});
    const newArticleSave = await newArticle.save();
    // console.log(req.body);
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Application running on port 3000");
})