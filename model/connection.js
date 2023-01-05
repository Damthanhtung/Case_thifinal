const mysql = require('mysql');
class Connection {
    static configToMySQL = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'demo_database',
        charset: 'utf8_general_ci'
    }
    static getConnection(){
        return mysql.createConnection(Connection.configToMySQL);
    }
    static connecting() {
        Connection.getConnection().connect(error =>{
            if (error) {
                console.log(error);
            } else {
                console.log('Connection Success!!!');
            }
        });
    }
}
Connection.connecting();
module.exports = Connection;