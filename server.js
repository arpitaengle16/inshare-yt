require('dotenv').config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path')
const cors = require('cors')


//Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // ['http:localhost:3000', 'http....5000']
}

app.use(cors(corsOptions));
app.use(express.static('public'));

const connectDB = require('./config/db')
connectDB();

app.use(express.json());
//Templates engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');

//Routes
app.use('/api/files', require('./routes/files'))

app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'));

app.listen(PORT, () =>{
    console.log(`listning on port ${PORT}`)
}) 