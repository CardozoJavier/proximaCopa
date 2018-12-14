var db = require('../index');
const Sequelize = require('sequelize');

const Precio = db.define('precio', {
	precio: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Precio;


// FUNCANDO 10:00hs
// var db = require('../index');
// const Sequelize = require('sequelize');

// const Precio = db.define('precio', {
// 	precio: {
// 		type: Sequelize.INTEGER,
// 	},
// });

// module.exports = Precio;
