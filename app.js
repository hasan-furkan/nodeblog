const path = require("path")
const express = require("express")
const app = express()
const engine = require('express-handlebars');
const hostName = "127.0.0.1";
const port = 5000
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const {generateDate, limit, truncate} = require("./helpers/hbs")
const expressSession = require("express-session")
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override")

mongoose.connect('mongodb://127.0.0.1/nodeblog_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

app.use(expressSession({
    secret: "testotesto",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/nodeblog_db' })
}))



app.use(fileUpload())



app.use(express.static("public"))

app.use(methodOverride('_method'))


// app.engine('handlebars', hbs);
/////// HANDLEBARS HELPERS


const hbs = engine.create({
    helpers: {
        generateDate: generateDate,
        limit : limit,
        truncate: truncate
    }
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// DISPLAY LINK Middleware

app.use((req,res,next) => {
    const {userId} = req.session
    if(userId) {
        res.locals = {
            displayLink: true
        }
    }else {
        res.locals = {
            displayLink: false
        }
    }
    next()
})

// Flash - Message Middleware

app.use((req,res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})



const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require("./routes/admin/index");

app.use("/", main)
app.use("/posts", posts)
app.use("/users", users)
app.use("/admin", admin)

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
    