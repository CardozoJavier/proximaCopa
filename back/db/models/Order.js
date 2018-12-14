var db = require('../index');
const Sequelize = require('sequelize');

const Order = db.define('order', {
    status: {
        type: Sequelize.ENUM('guardado', 'creado', 'enviado',  'finalizado', 'cancelado'), //PREGUNTAR
    },
    date:{
        type: Sequelize.DATE
    },
   importe:{
        type: Sequelize.INTEGER
    },
    address:{
        type:Sequelize.STRING,
    },
    city:{
        type:Sequelize.STRING
    },
    provincia:{
        type:Sequelize.STRING
    },  
    phone:{
        type:Sequelize.STRING
    }  
});

module.exports = Order;
