const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProducts() {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query('select * from product', (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    static saveProduct(product) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product (name, price, description, idCategory, countProduct, color)
                              VALUES ('${product.name}', ${product.price}, '${product.description}',
                                      ${product.idCategory}, ${product.countProduct}, '${product.color}')`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Creat Success!!!");
                    resolve(products);
                }
            });
        })
    }

    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from product
                              where id = ${id};`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            });
        })
    }

    static editProduct(product,id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update product
                              set name        = '${product.name}',
                                  price       = ${+product.price},
                                  description = '${product.description}',
                                  countProduct=${+product.countProduct},
                                  color       = '${product.color}'
                              where id = ${id}`, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    console.log("Edit Success!!!");
                    resolve(products);
                }
            });
        })
    }

    static remove(id) {
        let sql = `delete
                   from product
                   where id = ${id}`;
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('Thành công');
                }
            })
        })
    }

    static searchProduct(search) {
        let connection = Connection.getConnection();
        let sql = `SELECT *
                   FROM product
                   WHERE name LIKE '%${search}%'`
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, products) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
        })
    }
}

module.exports = ProductService;