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
const { response } = require('express');
const saltRounds = 10;

// need to add origin for hosted front-end react 
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

//app.set("trust proxy", 1);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
        // sameSite: "none",
        // secure: "true"
    },
}));

const PORT = process.env.PORT || 5000;

// const db = mysql.createPool({
//     host: "us-cdbr-east-05.cleardb.net",
//     user: "b721b1b7c25b63",
//     password: "08682f99",
//     database: "heroku_4912680b0bc4875"
// });

const db = mysql.createPool({
    host: "localhost",
    user: "jordan",
    database: "wsuparkingreview",
    port: "3306"
});

app.get('/', (req, res) => {
    console.log("hello");
    // console.log(req.session)
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
            if (err) {
                console.log(err);
            }

            if (result.length > 0) {
                res.send({ err: "Account with email already exists!" });
                emailFound = true;
                return;
            } else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }

                    db.query(
                        "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?);",
                        [email, hash, firstName, lastName],
                        (err, result) => {
                            if (err) {
                                res.send({ err: err });
                            } else {
                                res.send({ status: true });
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
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        // req.session.isAuth = true;
                        req.session.user = result;
                        // console.log(req.session);
                        req.session.save();
                        res.send({ loggedIn: true, user: req.session.user[0].email, userId: req.session.user[0].user_id })
                    } else {
                        res.send({ err: "Wrong Email or Password!" })
                    }
                })
            } else {
                res.send({ err: "No account exists!" })
            }
        }
    )
});

app.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
        res.send({ loggedIn: false });
    }
})

app.get('/login', (req, res) => {
    // console.log(req.session.isAuth)
    // console.log(req.session)
    if (req.session.user) {
        // console.log(req.session.user[0]);
        res.send({ loggedIn: true, user: req.session.user[0].email, userId: req.session.user[0].user_id });
    } else {
        res.send({ loggedIn: false });
    }
})

app.get('/ratings', (req, res) => {
    db.query(
        "SELECT is_deleted, parking_structure_id, AVG(review_rating) AS rating, COUNT(parking_structure_id) AS total_reviews FROM reviews WHERE is_deleted = false GROUP BY parking_structure_id;",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }
    );
});

app.get('/reviews', (req, res) => {
    var structure = req.query.structure;
    db.query(
        "SELECT users.first_name, users.last_name, reviews.review_text, reviews.review_rating, reviews.review_id, DATE_FORMAT(review_date, '%m-%d-%Y') as review_date FROM reviews JOIN users ON reviews.user_id = users.user_id WHERE reviews.parking_structure_id = ? AND reviews.is_deleted = false;",
        [structure], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }
    );
});

app.post('/review/submit', (req, res) => {
    console.log("endpoint reached");
    var parkingStructureId = req.body.parkingStructure;
    var email = req.body.email;
    console.log(req.body);
    console.log(email);
    var rating = req.body.rating;
    var textReview = req.body.textReview;
    db.query(
        "SELECT user_id, first_name, last_name FROM users WHERE email = ?;",
        [email], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    var userId = result[0].user_id;
                    var firstName = result[0].first_name;
                    var lastName = result[0].last_name;
                    console.log(userId);
                    db.query(
                        "INSERT INTO reviews (user_id, parking_structure_id, review_text, review_rating, review_date, is_deleted) VALUES (?,?,?,?, NOW(), false);",
                        [userId, parkingStructureId, textReview, rating], (err, response) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send({
                                    result: "success", review: {
                                        first_name: firstName,
                                        last_name: lastName,
                                        review_text: textReview,
                                        review_rating: rating,
                                        review_date: Date.now()
                                    }
                                });
                            }
                        });
                }
            }
        }
    );
});

app.post('/review/delete', (req, res) => {
    console.log("endpoint reached");
    var reviewId = req.body.reviewId;
    db.query(
        "UPDATE reviews SET is_deleted = true WHERE review_id = ?",
        [reviewId], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send({
                    result: "success"
                });
            }
        }
    );
});

app.get('/user/reviews', (req, res) => {
    var userId = req.query.userId;

    console.log(req.session.user);
    if(req.session.user[0].user_id != userId) {
        res.send({result: "Access Denied"});
    } else {
        db.query(
            "SELECT * FROM ( SELECT users.first_name, users.last_name, reviews.review_text, reviews.review_rating, reviews.review_id, reviews.parking_structure_id, DATE_FORMAT(review_date, '%m-%d-%Y') AS review_date FROM reviews JOIN users ON reviews.user_id = users.user_id WHERE users.user_id = ? AND reviews.is_deleted = false) AS data JOIN parking_structures ON data.parking_structure_id = parking_structures.parking_structure_id;",
            [userId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            }
        );
    }
});

app.post('/review/edit', (req, res) => {
    var reviewId = req.body.reviewId;
    var reviewRating = req.body.reviewRating;
    var reviewText = req.body.reviewText;
    db.query(
        "UPDATE reviews SET review_text = ?, review_rating = ? WHERE review_id = ?",
        [reviewText, reviewRating,  reviewId], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({
                    result: "success"
                });
            }
        }
    );

})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));