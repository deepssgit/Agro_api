const express = require("express")

const bodyParser = require("body-parser")

const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/agriDB",{useNewUrlParser: true},{useUnifiedTopology: true})



const app = express()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine","ejs")

const routes = require("./routes/routes.js")

app.use("/",routes)



app.listen(3000,function(){
    console.log("server is running");
})