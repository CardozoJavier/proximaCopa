var db = require('../index');
const Sequelize = require('sequelize');

const OrderProduct = db.define('orderProduct', {
    cantidad: {
        type: Sequelize.INTEGER,
    },
   
});
module.exports = OrderProduct;
