const express = require('express');
const mysql = require('mysql');

const app = express();
const cors = require('cors');
//const DbService = require('./dbService');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 5000;

const db = mysql.createPool({
    host: "localhost",
    user: "jordan",
    database: "wsuparkingreview",
    port: "3306"
});


app.get('/', (req, res) => {
    //const db = DbService.getDbServiceInstance();
    console.log("hello");
});

app.post('/register', (req, res) => {
   // const db = DbService.getDbServiceInstance();
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    var emailFound = false;

    // const result = db.getEmail(email);
    // var emailFound = false;
    // result.then(data => {
    //     if(data.length > 0) {
    //         emailFound = true;
    //         res.json({status: false});
    //         return;
    //     }
    // })
    // .catch(err => console.log(err));

    // if(emailFound) {
    //     return;
    // }
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
            
                    // const result = db.register(email, hash, firstName, lastName);
                    // result.then(data => res.json({status: true}))
                    // .catch(err => console.log(err));
                })
            
            }
        }
    )

    // if(emailFound) {
    //     return;
    // }


    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //     if(err) {
    //         console.log(err);
    //     }

    //     db.query(
    //         "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?);",
    //         [email, hash, firstName, lastName],
    //         (err, result) => {
    //             if(err) {
    //                 res.send({err: err});
    //             } else {
    //                 res.send({status: true});
    //             }
    //         }
    //     )

    //     // const result = db.register(email, hash, firstName, lastName);
    //     // result.then(data => res.json({status: true}))
    //     // .catch(err => console.log(err));
    // })


    console.log(req.body);
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));