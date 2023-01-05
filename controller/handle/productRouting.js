const fs = require('fs');
const qs = require('qs');
const ProductService = require('D:\\Codegym\\tháng 3\\DemoDatabase\\service\\productService.js');
const Category = require('D:\\Codegym\\tháng 3\\DemoDatabase\\service\\category.js');

class ProductRouting {
    static  getHtmlProducts(products,category, indexHtml) {
        let tbody = '';
        products.map((products, index) => {
            tbody += `<tr style="text-align: center">
            <th scope="row">${index}</th>
            <td>${products.name}</td>
            <td>${products.price}</td>
            <td>${category[products.idCategory].name}</td>
            <td>${products.countProduct}</td>
            <td>${products.color}</td>
            <td><a href="product/edit/${products.id}" class="btn btn-danger">Edit</a></td>
            <td><a href="product/delete/${products.id}" class="btn btn-danger">Delete</a></td>
        </tr>`
        });
        indexHtml = indexHtml.replace('{products}', tbody);
        return indexHtml;

    }

    static showHome(req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
                if (err) {
                    console.log(err)
                } else {
                    let category = await Category.getCategories()
                    let products = await ProductService.getProducts();
                    indexHtml = ProductRouting.getHtmlProducts(products,category, indexHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            })
        } else {
            let data = '';
            req.on('data', chuck => {
                data += chuck;
            })
            req.on('end',async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let search = qs.parse(data)
                    console.log(search.search)
                    fs.readFile('./views/index.html', 'utf-8', async (err, indexHtml) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let category = await Category.getCategories()
                            let products = await ProductService.searchProduct(search.search);
                            indexHtml = ProductRouting.getHtmlProducts(products,category, indexHtml);
                            res.writeHead(200, 'text/html');
                            res.write(indexHtml);
                            res.end();
                        }
                    })
                }
            })
        }
    }
    static showFormCreate(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/product/create.html', 'utf8', async (err, indexHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let categories =await Category.getCategories()
                    let optionHtml = ``;
                    for (let i=0;i<categories.length; i++) {
                        optionHtml += `<option value="${categories[i].id}">${categories[i].name}</option>`
                    }
                    indexHtml = indexHtml.replace('{categories}',optionHtml);
                    res.writeHead(200, 'text/html');
                    res.write(indexHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    console.log(product)

                    await ProductService.saveProduct(product);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }

    static showFormEdit(req, res, id) {
        if (req.method === "GET") {
            fs.readFile('./views/product/edit.html', 'utf8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);

                    editHtml = editHtml.replace('{name}', product[0].name);
                    editHtml = editHtml.replace('{price}', product[0].price);
                    editHtml = editHtml.replace('{description}', product[0].description);
                    editHtml = editHtml.replace('{countProduct}', product[0].countProduct);
                    editHtml = editHtml.replace('{color}', product[0].color);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            });
        } else {
            let productChunk = '';
            req.on('data', chunk => {
                productChunk += chunk
            });
            req.on('end', async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    await ProductService.editProduct(product, id);
                    res.writeHead(301, {'location': '/home'});
                    res.end();
                }
            });
        }
    }

    static async deleteProduct(req, res, id) {
        if (req.method === 'GET') {
            fs.readFile('./views/product/delete.html', 'utf8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err.message);
                } else {
                    res.writeHead(200, 'text/html');
                    deleteHtml = deleteHtml.replace('{id}',id);
                    res.write(deleteHtml);
                    res.end();
                }
            });
        } else {
            let mess = await ProductService.remove(id)
                res.writeHead(301, {'location': '/home'});
                res.end();
        }
    }
}

module.exports = ProductRouting;