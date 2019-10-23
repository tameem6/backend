const express =  require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');
//Middleware
const postsRoute = require('./Routes/posts');
app.use(bodyParser.json());
app.use('/posts', postsRoute);
//Routes
app.get('/', (req,res) => {
    res.send("Homepage");
});

//DB connect
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>{
    console.log("Connected");
    
})

//Listening
app.listen(3000);