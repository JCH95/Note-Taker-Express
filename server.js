const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const uniqueid = require('uniqid');
const notes = require('./db/db.json');

// Middleware
// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming JSON data
app.use(express.json());
// Parse incoming css/js data
app.use(express.static('public'));


// Notes route to get info from the notes.html file on the front end
app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API route for notes to be pulled from database
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

// Route for getting info from the index.html file on the front end
app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// Route for posting notes
app.post('/api/notes', (req,res) => {
    const note = req.body;
    const noteRead = JSON.parse(fs.readFileSync('./db/db.json'));

    note.id = uniqueid();
    noteRead.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(noteRead));
    res.json(noteRead);
});


// Route for deleting notes based on their ID
app.delete('/api/notes/:id', (req,res) => {
    const noteID = req.params.id;
    const list = JSON.parse(fs.readFileSync('./db/db.json'));
    if (notes[i].id == req.params.id) {
        notes.splice(i, 1)
    }

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.sendFile(path.join(__dirname, './db/db.json'));
    console.log(notes);
});


// Starts the server and console logs if it's working
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});