const express = require("express");
const app = express();
const port =8080;
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id : uuidv4(),
        image : "/images/4.jpeg",
        caption : "Shine like nothing can be dark for you!"
    },

    {
        id : uuidv4(),
        image : '/images/2.png',
        caption : "God is so gracious!"
    },

    {
        id : uuidv4(),
        image : '/images/3.png' ,
        caption : "Wow it's buzzing music!"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {image,caption}=req.body;
    let id =uuidv4();
    posts.push({id,image,caption});
    res.redirect("/posts");
});


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newCaption= req.body.caption;
    let post =posts.find((p)=> id === p.id);
    post.caption = newCaption;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});



app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts =posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})