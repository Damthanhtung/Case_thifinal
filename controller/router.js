const ProductRouting = require('./handle/productRouting');
const handler = {
    "home": ProductRouting.showHome,
    "product/create": ProductRouting.showFormCreate,
    "product/edit": ProductRouting.showFormEdit,
    "product/delete": ProductRouting.deleteProduct,

}
module.exports = handler;
