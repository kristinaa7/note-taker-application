const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT 
|| 3001; 

const testdb = require('./db/db.json');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(path.join());
})

app.post("/", function(req,res){
})

app.delete("/", function(req,res){
    res.sendFile(path.join());
})

app.listen(PORT,() => {
    console.log(`App listening on http://localhost:" + ${PORT}`);
})