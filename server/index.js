const express = require('express');

const app = express();
const cors = require('cors');
const DbService = require('./dbService');

const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    const db = DbService.getDbServiceInstance();
    console.log("hello");
});

app.post('/register', (req, res) => {
    const db = DbService.getDbServiceInstance();
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;

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

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err);
        }

        const result = db.register(email, hash, firstName, lastName);
        result.then(data => res.json({status: true}))
        .catch(err => console.log(err));
    })


    console.log(req.body);
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));