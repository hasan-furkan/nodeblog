const express = require("express")
const app = express()
const engine = require('express-handlebars');
const hostName = "127.0.0.1";
const port = 5000

const path = require("path")

app.use(express.static("public"))

app.engine('handlebars', engine.engine());
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {
    res.render('site/index');
})

app.get("/about", (req, res) => {
    res.render('site/about');
})

app.get("/blog", (req, res) => {
    res.render('site/blog');
})

app.listen(port, hostName, () => console.log(`server calisiyor http://${hostName}:${port}/`))


















// const http = require("http");


// const hostName = "127.0.0.1";
// const port = 5000;

// const fs = require("fs")

// const indexPage = fs.readFileSync("index.html")
// const aboutPage = fs.readFileSync("about.html")
// const contactPage = fs.readFileSync("contact.html")
// const notFoundPage = fs.readFileSync("404.html")

// // const server = http.createServer((req, res) => {
// //     if(req.url === "/"){
// //         return res.end("Home Page")
// //     }else if(req.url === "/about"){
// //         return res.end("About Page")
// //     }else if(req.url === "/contact"){
// //         return res.end("Contact Page")
// //     }else {
// //         res.statusCode = 404
// //         res.end("SAYFA BULUNAMADi")
// //     }
    
// // });

// const server = http.createServer((req, res) => {
//     if(req.url === "/"){
//         return res.end(indexPage)
//     }else if(req.url === "/about"){
//         return res.end(aboutPage)
//     }else if(req.url === "/contact"){
//         return res.end(contactPage)
//     }else {
//         res.statusCode = 404
//         res.end(notFoundPage)
//     }
    
// });


// server.listen(port, hostName, ()=> {
//     console.log(`server calisiyor http://${hostName}:${port}/`);
// } )


// app.use("/test", (req,res,next)=> {
    //     console.log("Ben middleware olarak calisiyorum");
    //     next()
    // })
    
    // app.get("/", (req,res)=> {
    //     res.sendFile(path.resolve(__dirname, "index.html"))
    // })
    
    // app.get("/about", (req,res)=> {
    //     res.sendFile(path.resolve(__dirname, "about.html"))
    // })
    
    // app.get("/contact", (req,res)=> {
    //     res.sendFile(path.resolve(__dirname, "contact.html"))
    // })
    