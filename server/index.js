const express = require('express');

const app = express();
const cors = require('cors');
const DbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    const db = DbService.getDbServiceInstance();
    console.log("hello");
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));