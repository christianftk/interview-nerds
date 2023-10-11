require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/library", {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));

const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`Server running on http://localhost:${PORT}`)
)
app.use(express.json())

const libraryRouter = require('./routes/library')
const authorsRouter = require('./routes/authors')
app.use('/library', libraryRouter)
app.use('/authors', authorsRouter)
