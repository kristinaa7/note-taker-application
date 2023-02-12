//Dependencies needed for the code to run
const express = require('express')
const path = require('path')
const fs = require('fs')
const notes = require('./db/db.json');
const app = express()
const PORT = process.env.PORT || 3001; 

//Middleware to set up the Express app to handle data parsing
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


//GET request for notes
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    res.json(`${req.method} request received`);
    return res.json(notes);
});

// POST request
app.post('/api/notes', (req,res) => {
    res.json(`${req.method} request received`);
    let response;
});

//DELETE request
app.delete("/", (req,res) => {
    res.sendFile(path.join());
})

app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
})