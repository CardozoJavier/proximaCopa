// var db = require('../index');
// const Sequelize = require('sequelize');

// const Product = db.define('product', {
//     productName: {
//         type: Sequelize.STRING,
//     },
//     date: {
//         type: Sequelize.STRING,
//     },
//     stock: {
//         type: Sequelize.INTEGER,
//     },
//     valor: {
//         type: Sequelize.INTEGER,
//     },
//     description: {
//         type: Sequelize.TEXT,
//     },
//     image: {
//         type: Sequelize.TEXT,
//     }
// });
// module.exports = Product;

//FUNCANDO 10:00hs
var db = require('../index');
const Sequelize = require('sequelize');

const Product = db.define('product', {
    productName: {
			type: Sequelize.STRING,
			validate : {
				notEmpty : true
			}
    },
    year: {
      type: Sequelize.STRING,
    },
    stock: {
			type: Sequelize.INTEGER,
			validate : {
				notEmpty : true
			}    
		},
    price: {
			type: Sequelize.INTEGER,
			validate : {
				notEmpty : true
			}
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    }
});


module.exports = Product;
