const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const session = require("express-session");
const session = require("express-session");

const app = express();
const cors = require('cors');

//const DbService = require('./dbService');

const bcrypt = require('bcrypt');
const e = require('express');
const saltRounds = 10;

// need to add origin for hosted front-end react 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "wsu",
    resave: false,
    saveUninitialized: false,
    secure: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    },
}));

// app.use(session({
//     key: "userId",
//     secret: "wsu",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         maxAge: 60000 * 60 * 24
//     }
// }));
// app.set('trust proxy', 1) // trust first proxy

// res.header("Access-Control-Allow-Origin", "http://127.0.0.1:9000");


const PORT = process.env.PORT || 5000;

const db = mysql.createPool({
    host: "localhost",
    user: "jordan",
    database: "wsuparkingreview",
    port: "3306"
});


app.get('/', (req, res) => {
    console.log("hello");
    console.log(req.session)
});

app.post('/register', (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    var emailFound = false;

    db.query(
        "SELECT email FROM users WHERE email = ?;",
        [email],
        (err, result) => {
            if(err) {
                console.log(err);
            } 

            if(result.length > 0) {
                res.send({err: "Account with email already exists!"});
                emailFound = true;
                return;
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if(err) {
                        console.log(err);
                    }
            
                    db.query(
                        "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?);",
                        [email, hash, firstName, lastName],
                        (err, result) => {
                            if(err) {
                                res.send({err: err});
                            } else {
                                res.send({status: true});
                            }
                        }
                    )
                })
            
            }
        }
    )
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;",
        [email],
        (err, result) => {
            if(err) {
                res.send({err: err});
            }

            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response) {
                       // req.session.isAuth = true;
                        req.session.user = result;
                        console.log(req.session);
                        req.session.save();
                        res.send({result})
                    } else {
                        res.send({err: "Wrong Email or Password!"})
                    }
                })
            } else {
                res.send({err: "No account exists!"})
            }
        }
    )
});

app.get('/login', (req, res) => {
   // console.log(req.session.isAuth)
   console.log(req.session)
    if(req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false});
    }
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));