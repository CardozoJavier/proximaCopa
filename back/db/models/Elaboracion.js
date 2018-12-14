var db = require('../index');
const Sequelize = require('sequelize');

const Elaboracion = db.define('elaboracion', {
	fecha: {
		type: Sequelize.STRING,
	},
});

module.exports = Elaboracion;

// FUNCANDO 10:00hs

// var db = require('../index');
// const Sequelize = require('sequelize');

// const Elaboracion = db.define('elaboracion', {
// 	fecha: {
// 		type: Sequelize.STRING,
// 	},
// });

// module.exports = Elaboracion;
