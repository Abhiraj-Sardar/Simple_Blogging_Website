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

app.get("/edit/:id",async(req,res)=>{
    const id = req.params.id;
    const article = await Article.findById({_id:id});
    if(article==null){
        res.redirect("/");
    }else{
        res.render("edit",{
            article:article
        })
    }
})

app.post("/update/:id",async(req,res)=>{
    const {id} =req.params;
    const {title,post1,info}=req.body;
    const updateArticle = await Article.findByIdAndUpdate({_id:id},{title,post1,info},{new:true});
    res.redirect("/");
})

app.get("/read/:id",async(req,res)=>{
    const id = req.params.id;
    const articleData = await Article.findById({_id:id});
    if(articleData==null)
    {
        res.redirect("/");
    }
    else{
        res.render("read",{
            article:articleData
        })
    }
})

app.get("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    const deleteArticle = await Article.findByIdAndDelete({_id:id});
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log("Application running on port 3000");
})