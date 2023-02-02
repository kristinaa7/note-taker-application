const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = process.env.PORT 
|| 3001; 

const notesdb = require('./db/db.json');



app.get("/", function(req,res){
    res.sendFile(path.join());
})

app.get("/", function(req,res){
    res.sendFile(path.join());
})

app.get("/", function(req,res){
    res.sendFile(path.join());
})

app.post("/", function(req,res){
})

app.delete("/", function(req,res){
    res.sendFile(path.join());
})

app.delete("/", function(req,res){
    res.sendFile(path.join());
})