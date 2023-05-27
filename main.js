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


//1st party


//constants
const port = 3000;
//port server is listening on


/*
init
all processes that need to be done before the server is usufull
Pulls all needed info from json files
- creates object for all logged in users with id and username (if client gives a used id it can access everything for that user)
*/

var users = {'maxdeicke': '1234'};
//users stores all active users since the server restarted
//users is a js object that stores all users as the value of the id


//helper funcitons

//UserinfoExists returns true if the uname and password combination are valid
function UserinfoExists(uname, password) {
    //relies on fs, need to import
    try {
            var allUsersLogin = JSON.parse(fs.readFileSync('logindetails.json'));
        if (allUsersLogin[uname] === password)
        {
            return true;
        } else
        {
            return false;
        }
    } catch {
        console.log('Error: LoginJson could not be converted');
    }
}

function createUserId(uname) {
    const id = Math.round(Math.random() * 10000000);
    if (users[uname] === undefined) {
        users[uname] = id;
        return id;
    }
    else {
        console.log(`user ${uname} already exists`);
        return users[uname];
    }
}

/*
createUserSession
this functions should be called if a user trys to log in.
It checks if the user credential are correct and if they are creates a session id,
loggs it in memory (object users) and returns the id to the user
*/

function createUserSession(uname, password) {
    if (UserinfoExists(uname, password)) {
        console.log('user exists')
        var id = createUserId(uname);
        return id;
    } else {
        console.log('user does not yet exist')
        return false;
    }
}



/*
Node
list of all node requests that the node server handles, listening function at the end

Der Login Prozess:
Zu Beginn hat der User die ID 0, kann auf nichts zugreifen
Die ID wird local im browser als variable gespeichert
User gibt bei jedem request die id an den server und der gibt diese wieder zurück

gibt der user seine login daten an und drückt auf anmelden wird gecheckt, ob sich
der username mit dem passwort in logindetails.json befindet
Ist das der Fall wird für den entsprechenden username eine id erstellt, die in der memory
vom server gespeichert wird. Der Server gibt die id an den user


*/

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
    console.log(new Date() + "Someone logged onto the site")
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get('/guest', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/guest.html"));
});

app.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/info.html"));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + "/pages/login.html"));
    console.log("login page")
    //console.log(createUserSession('test', 'weser123'))
  });

app.get('/loginattempt', (req, res) => {
    if (UserinfoExists(req.query.uname, req.query.password)) {
        //?uname=value&password=value
        var id = createUserSession(req.uname, req.password);
        res.send('user exists ' + id);
    }
    else {
        res.sendFile(path.join(__dirname + "/pages/loginwrong.html"));
    }
});


//app listen
app.listen(port, function(error) {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
    })