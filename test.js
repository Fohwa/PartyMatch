/*
declare
List of all needed 3rd party extensions with a comment for a short explanation

List of all 1st party extensions with longer explanation
*/
//third party extensions
let app = require('express')();
//needed for express in node, for the way we declare node requests and responses
const express = require('express');
//not sure if this is redondend, but used this one in oter code aswell
const fs = require('fs');
//fs is filesystem to access files the server needs
//makes it easy creating html code with css
const path = require('path');
const { stringify } = require('querystring');
//path allowes easier description of file location
app.use(express.static(path.join(__dirname, 'public')));
//express static lets the returned html code access some css files for formatting

//constants
const port = 3000;
//port server is listening on


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/image.html"));
    console.log(new Date() + "Someone logged onto the site")
});


//app listen
app.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
    })