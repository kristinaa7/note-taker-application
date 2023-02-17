//Dependencies needed for the code to run
const express = require('express')
const path = require('path')
const fs = require('fs')
//when I require db in an external, the data is parsed 
const notes = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware to set up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

//GET request for notes
app.get('/api/notes', (req, res) => {
    const saveNote = notes;
    res.json(saveNote);
});

//Obtain exisiting notes from a real database (the parsed notes)
// fs.readFile('./db/db.json', 'utf8', (err, data) => {
// if (err) {
//     console.error(err);
// } else {
//     //Convert string into JSON object
//     const parsedNotes = JSON.parse(data);
//     //frontend
//     res.status(200).json(parsedNotes);
//     //backend
// }
// })

// POST request using the route api/notes
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedNotes = JSON.parse(data);
            //parsedNotes is the old notes
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uuidv4()
            };
            //adding new notes to the old notes(parsednotes)
            parsedNotes.push(newNote);
            fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify(parsedNotes), (err) => {
                if (err) {
                    console.error(err);
                    //     res.json(newNote);
                }
                res.status(200).json(newNote)
            })
        }
    })
});

// DELETE request
app.delete("/api/notes/:id", (req, res) => {
    const saveNote = notes;
    const notesId = saveNote.filter((note) => note.id !== req.params.id);
    console.log(notesId);
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notesId));
    res.json(notesId)
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT} 🚀`);
});