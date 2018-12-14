var db = require('../index'); 
const Sequelize = require('sequelize');

const Cellar = db.define('cellar', {
    cellarName: {
        type: Sequelize.STRING,
				allowNull: false
    },	
});

module.exports = Cellar;
