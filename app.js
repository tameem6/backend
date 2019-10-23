const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv/config');
//Middleware
const postsRoute = require('./Routes/posts');
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);
//Routes
app.get('/', (req,res) => {
    res.send("Homepage");
});

//DB connect
mongoose.connect("mongodb+srv://tameem:91i2ta@cluster0-i1pux.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }, () =>{
    console.log("Connected");
    
})

//Listening
app.listen(process.env.PORT || 3000);