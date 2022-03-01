const mysql = require('mysql');
let instance = null;

const connection = mysql.createPool({
    host: "localhost",
    user: "jordan",
    database: "wsuparkingreview",
    port: "3306"
});

connection.getConnection((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('db  dasda ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
}

module.exports = DbService;