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
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET request for notes
app.get('/api/notes', (req, res) => {
    //Obtain exisiting notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            //Convert string into JSON object
            const parsedNotes = JSON.parse(data);
            //frontend
            res.status(200).json(parsedNotes);
            //backend
            console.info(`${req.method} request received to get notes`);
        }
    })
});

// POST request using the route api/notes
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            //parsedNotes is the old notes
            const newNote = req.body;
            //adding new notes to the old notes(parsednotes)
            parsedNotes.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), (err) => {
        if (err) {
            console.error(err);
        } else {
            res.json(newNote);
                }
            })
        }
    })
});

// DELETE request
app.delete ("/api/notes/:id", (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
    let parsedNotes = JSON.parse(data);
    const notesId = parsedNotes.filter((note)=> note.id !==req.params.id)
})

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parsedNotes))
});

app.listen(PORT,() => {
    console.log(`App listening on http://localhost:${PORT}`);
});