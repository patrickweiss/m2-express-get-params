const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/users/:username', (req, res, next) => {
    res.send(req.params);
})

app.get('/books/:bookId', (req, res, next) => {
    res.send(req.params);
})


app.get('/search', (req, res, next) => {
    res.send(req.query)
})

app.get('/', (req, res, next) => {
    res.render('index');
})


app.get('/get-user-info', (req, res) => {
    res.render('user-info-form');
});

app.get('/display-user-info', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;
    let superhero = req.query.superhero;

    res.send(`
      Your name is ${name}
      Your age is ${age}
      Your favorite superhero is ${superhero}
    `)
});


function myRequestlogger(req, res, next) {
    console.log("Got request to log:" + req.url);
    req.loggerMessage = "Request was logged!";
    next();
}

app.use(myRequestlogger);

app.get('/test', (req, res) => {
    let loggerMessage = req.loggerMessage;
    res.send(loggerMessage);
});


app.get('/login', (req, res) => {
    res.render('login')
});


app.use(bodyParser.urlencoded({ extended: true }));

//npm install body parser first 

app.post('/login', (req, res) => {
    console.log("Login Body:", req.body);
    res.send(JSON.stringify(req.body));
});

/*
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    res.send(`Email: ${email}, Password: ${password}`);
});

app.post('/login', (req, res) => {
    console.log("Login Body:", req.body);
    let email = req.body.email;
    let password = req.body.password;
    res.send(`Email: ${email}, Password: ${password}`);
});
*/
//Send data within a User Object
app.get('/loginUser', (req, res) => {
    res.render('loginUser')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.post('/loginUser', (req, res) => {
    console.log("Login Body:", req.body);
    res.send("User Object:" + JSON.stringify(req.body));
});


app.listen(3000, () => console.log('App listening on port 3000!'));