var db = require('../index');
const Sequelize = require('sequelize');

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('guardado', 'creado', 'enviado',  'finalizado', 'cancelado'),
    },
    date:{
        type: Sequelize.DATE
    },
   	// total:{
    //     type: Sequelize.INTEGER
    // },
    // address:{
    //     type:Sequelize.STRING,
    // },
    // city:{
    //     type:Sequelize.STRING
    // },
    // state:{
    //     type:Sequelize.STRING
    // },  
    // phone:{
    //     type:Sequelize.STRING
    // }  
});

module.exports = Order;
