const express =  require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
dotenv.config();
//Middleware

const postsRoute = require('./Routes/posts');
const authRoute = require('./Routes/auth');

app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postsRoute);
app.use('/api/user', authRoute);

//Routes
app.get('/', (req,res) => {
    res.send("Homepage");
});

//DB connect
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>{
    console.log("Connected");
})

//Listening
app.listen(process.env.PORT || 3000);