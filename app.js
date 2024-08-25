const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutesAPI');
const pageRoutes = require('./routes/pageRoutes');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// static files & cookie parser
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// templates
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));


// routes
app.use('/', pageRoutes);
app.use('/api/v1/account', userRoutes);


const port = process.env.PORT;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> {console.log(`Server is running on port ${port}...`)});

    } catch (error) {
        console.log(error);
    }
};

start();
