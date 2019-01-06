var db = require('../index');
const Sequelize = require('sequelize');

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('creada', 'cancelada', 'completada'),
    },
    date: {
        type: Sequelize.STRING,
    },
		// ref: {
		// 	type : Sequelize.STRING,
		// }
});

module.exports = Order;
