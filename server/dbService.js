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

    async register(email, hash, firstName, lastName) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?);";
                connection.query(query, [email, hash, firstName, lastName], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getEmail(email) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT email FROM users WHERE email = ?;";
                connection.query(query, [email], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;