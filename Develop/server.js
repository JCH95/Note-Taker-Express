const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const uniqueID = require('uuid');
const notes = require('./db/db.json');

// Middleware
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Parse incoming css/js data
app.use(express.static('public'));

// API route for notes to be pulled from database
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// Notes route to get info from the notes.html file on the front end
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// Route for getting info from the index.html file on the front end
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Starts the server and console logs if it's working
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});